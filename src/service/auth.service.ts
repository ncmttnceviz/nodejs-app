import {LoginDto, RegisterDto} from "@dto/auth.dto";
import {userRepository} from "@repository/user.repository";
import * as jwt from 'jsonwebtoken'
import {randomBytes, scrypt} from "crypto";
import {promisify} from 'util';
import {JwtPayloadInterface} from "@interface/Jwt-payload.interface";
import {BadRequest} from "@error/bad-request.error";
import {languageService} from "@app/services/language.service";
import {AuthUserResponse} from "../response/auth-user.response";
import {queueService} from "@app/services/queue.service";
import {userLogProcessor} from "@processor/user-log.processor";
import {userLogService} from "@service/user-log.service";
import {appHelper} from "@helper/app.helper";
import {userTokenRepository} from "@repository/user-token.repository";
import {verificationCodeRepository} from "@repository/verification-code.repository";

const scryptAsync = promisify(scrypt)

class AuthService {

    async checkUser(email: string): Promise<boolean> {
        return !!(await userRepository.findByEmail(email))
    }

    async createUser(registerDto: RegisterDto) {
        registerDto.password = await this.hashPassword(registerDto.password);
        const user = await userRepository.createUser(registerDto)
        const now = new Date();
        const expireDate = new Date(now.getTime() + (5 * 60 * 1000))
        await verificationCodeRepository.createCode(user, 'email', appHelper.generateString(6), expireDate)
        return user;
    }

    async loginUser(loginDto: LoginDto, ip: string): Promise<AuthUserResponse> {
        const user = await userRepository.findByEmail(loginDto.email);
        if (!await this.passwordCompare(user?.password!, loginDto.password)) {
            queueService.sendCommand(userLogProcessor, {
                type: 'user_login_log',
                data: {
                    ip: ip,
                    userId: user?.id,
                    loginDate: new Date(),
                    status: false
                }
            })
            throw new BadRequest(languageService.trans('wrongPassword'), 'ASFL1')
        }

        const jwt = this.generateJwt({
            email: user?.email!,
            username: user?.firstname + '' + user?.lastname,
            userId: user?.id!
        })
        const today = new Date();
        const tokenExpireDate = new Date(today.setMonth(1));
        await userTokenRepository.createToken({userId: user?.id!, token: jwt, expireDate: tokenExpireDate})
        const lastFailLogin = await userLogService.getLastFailLoginByUser(user?.id!)

        return (new AuthUserResponse())
            .setId(user?.id!)
            .setFirstName(user?.firstname!)
            .setLastName(user?.lastname!)
            .setRegistrationDate(appHelper.reformatDate(new Date(user?.createdAt!)))
            .setAccessToken(jwt)
            .setLastFailLogin(lastFailLogin?.toString() ? appHelper.reformatDate(new Date(lastFailLogin?.toString()!)) : null)
    }

    async logoutUser(userId: string): Promise<boolean> {
        return !!(await userTokenRepository.deleteTokensByEmail(userId));
    }

    generateJwt(payload: JwtPayloadInterface): string {
        return jwt.sign(payload, process.env.JWT_KEY!, {
            expiresIn: 60 * 60 * 24 * 30
        })
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(password, salt, 32)) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    private async passwordCompare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        const [hashedPassword, salt] = storedPassword.split('.');

        const buf = (await scryptAsync(suppliedPassword, salt, 32)) as Buffer
        return buf.toString('hex') === hashedPassword
    }
}

export const authService = new AuthService();