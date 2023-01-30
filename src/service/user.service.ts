import {userRepository} from "@repository/user.repository";
import {MailInterface} from "@interface/mail.interface";
import {languageService} from "@app/services/language.service";
import {mailerService} from "@app/services/mailer.service";
import {verificationCodeRepository} from "@repository/verification-code.repository";
import {BadRequest} from "@error/bad-request.error";

class UserService {
    async sendVerificationEmail(userId: string): Promise<boolean> {
        const user = await userRepository.getUserWithVerificationCode(userId)

        if (user) {
            const data: MailInterface = {
                from: process.env.MAIL_FROM!,
                to: user.email,
                subject: languageService.trans('verificationMail'),
                text: languageService.trans('verificationCode') + ' ' + user.code
            }

            return mailerService.sendMail(data)
        }

        return false
    }

    async verifyUser(code: string): Promise<boolean> {
        const verificationCode = await verificationCodeRepository.getCode(code);
        if (!verificationCode) throw new BadRequest(languageService.trans('verificationCodeInvalid'), 'USFVU1')

        if (verificationCode.expireDate < new Date()) throw new BadRequest(languageService.trans('verificationCodeTimeout'), 'USFVU2')

        await userRepository.verifyUser(verificationCode.userId).catch((err) => {
            throw err
        });

        return true
    }
}

export const userService = new UserService();