import {NextFunction, Request, Response} from "express";
import {BadRequest} from "@error/bad-request.error";
import {languageService} from "@app/services/language.service";
import {userService} from "@service/user.service";
import {ResponseOrganizer} from "@app/services/response-organizer.service";

class UserController {
    async verifyEmail(req: Request, res: Response, next: NextFunction) {
        const {code} = req.body;
        if (!code) return next(new BadRequest(languageService.trans('verifyCodeRequired'), 'UCFVE1'))

        await userService.verifyUser(code)
            .then(() => {
                const response = new ResponseOrganizer()
                    .setMessage(languageService.trans('emailVerificationSuccess'));
                res.sendData(response)
            })
            .catch((err) => {
                return next(err)
            })
    }
}

export const userController = new UserController();