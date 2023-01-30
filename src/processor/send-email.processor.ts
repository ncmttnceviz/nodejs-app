import {AbstractProcessor} from "@app/services/rabbitmq/abstract.processcor";
import {Channel, ConsumeMessage} from "amqplib";
import {ProcessorConfig} from "@app/services/rabbitmq/rabbitmq.interface";
import {captureException} from "@sentry/node";
import {userService} from "@service/user.service";

class SendEmailProcessor extends AbstractProcessor {
    processor(channel: Channel, msg: ConsumeMessage): void {
        try {
            const content = JSON.parse(msg.content.toString())
            if (content.type === 'verification_email') {
                userService.sendVerificationEmail(content.message.userId)
                    .catch((err) => {
                        captureException(err)
                        return channel.reject(msg, false)
                    })
            }
        } catch (e) {
            captureException(e)
        }
        return channel.ack(msg)
    }

    getConfig(): ProcessorConfig {
        return {
            exchange: 'direct_exchange',
            queue: 'send_email',
            routingKey: 'send-email',
            config: {
                autoDelete: false,
                durable: true,
            }
        }
    }
}

export const sendEmailProcessor = new SendEmailProcessor();