import {LoginDto, RegisterDto} from "@dto/auth.dto";
import {userRepository} from "@repository/user.repository";
import * as jwt from 'jsonwebtoken'
import {randomBytes,scrypt} from "crypto";
import {promisify} from 'util';
import {JwtPayloadInterface} from "@interface/Jwt-payload.interface";
import {BadRequest} from "@error/bad-request.error";
import {languageService} from "../app/services/language.service";
import {AuthUserResponse} from "../response/auth-user.response";

const scryptAsync = promisify(scrypt)

class AuthService {

    async checkUser(email: string) : Promise<boolean> {
        return !!(await userRepository.findByEmail(email))
    }

    async createUser(registerDto: RegisterDto) {
        registerDto.password = await this.hashPassword(registerDto.password);
        return await userRepository.createUser(registerDto);
    }

    async loginUser(loginDto: LoginDto) : Promise<AuthUserResponse> {
        const user = await userRepository.findByEmail(loginDto.email);
        if (!await this.passwordCompare(user?.password!,loginDto.password)){
            throw new BadRequest(languageService.trans('wrongPassword'), 'ASFL1')
        }

        const jwt = this.generateJwt({email: user?.email!, username: user?.firstname + '' + user?.lastname})

        return (new AuthUserResponse())
            .setId(user?.id!)
            .setFirstName(user?.firstname!)
            .setLastName(user?.lastname!)
            .setRegistrationDate(user?.createdAt!)
            .setAccessToken(jwt)
    }

    generateJwt(payload: JwtPayloadInterface): string {
        return jwt.sign(payload, process.env.JWT_KEY!)
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