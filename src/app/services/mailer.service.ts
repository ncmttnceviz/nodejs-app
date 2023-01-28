import nodemailer from 'nodemailer'
import {MailInterface} from "@interface/mail.interface";
import {captureException} from "@sentry/node";

export class MailerService {
    private transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST!,
        port: parseInt(process.env.MAIL_PORT!),
        secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER!, // generated ethereal user
            pass: process.env.MAIL_PASS!, // generated ethereal password
        },
    });

    async sendMail(data: MailInterface): Promise<boolean> {
        return await this.transporter.sendMail(data)
            .then(() => {
                return true
            })
            .catch((err) => {
                console.log(err)
                captureException(err)
                return false
            })
    }
}

export const mailerService = new MailerService()