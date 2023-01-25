import {NextFunction, Request, Response} from "express";
import {LoginDto, RegisterDto} from "@dto/auth.dto";
import {validateSync} from "class-validator";
import {Validation} from "@error/validation.error";
import {authService} from "@service/auth.service";
import {BadRequest} from "@error/bad-request.error";
import {languageService} from "../app/services/language.service";
import {queueService} from "../app/services/queue.service";
import {userLogProcessor} from "../processcor/user-log.processor";
import {rateLimiter} from "../app/services/rate-limiter.service";
import {ManyRequestError} from "@error/many-request.error";

export class AuthController {

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {firstname, lastname, email, password} = req.body;

        const registerDto = new RegisterDto()
        registerDto.firstname = firstname;
        registerDto.lastname = lastname;
        registerDto.email = email;
        registerDto.password = password;

        const validation = validateSync(registerDto);
        if (validation.length > 0) return next(new Validation(validation))

        if (await authService.checkUser(registerDto.email)) {
            return next(new BadRequest(languageService.trans('userExist'), 'ACFR1'))
        }

        try {
            const user = await authService.createUser(registerDto);
            res.status(200).json(user)
        } catch (e) {
            return next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const checkLimit = await rateLimiter.Limiter('login' + req.ip.toString().replace('::', ''), 5, 60);
        if (checkLimit) {
            return next(new ManyRequestError())
        }
        const {email, password} = req.body;

        const loginDto = new LoginDto();
        loginDto.email = email;
        loginDto.password = password

        const validation = validateSync(loginDto)
        if (validation.length > 0) return next(new Validation(validation))

        if (!await authService.checkUser(loginDto.email)) return next(new BadRequest(languageService.trans('userNotFound'), 'ACFL1'))

        try {
            const user = await authService.loginUser(loginDto, req.ip);

            queueService.sendCommand(userLogProcessor, {
                type: 'user_login_log',
                data: {
                    ip: req.ip,
                    userId: user.getId(),
                    loginDate: new Date(),
                    status: true
                }
            })

            res.status(200).json(user)

        } catch (e) {
            return next(e)
        }
    }

    async me(req: Request, res: Response, next: NextFunction) {
        console.log(req.user?.email)
    }

}

export const authController = new AuthController();