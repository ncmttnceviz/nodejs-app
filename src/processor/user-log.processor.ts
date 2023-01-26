import {AbstractProcessor} from "@app/services/rabbitmq/abstract.processcor";
import {ProcessorConfig} from "@app/services/rabbitmq/rabbitmq.interface";
import {Channel, ConsumeMessage} from "amqplib";
import {LoginLogDoc} from "@entity/doc/login-log.doc";
import {userLogService} from "@service/user-log.service";

class UserLogProcessor extends AbstractProcessor {

    async processor(channel: Channel, msg: ConsumeMessage): Promise<void> {

        const content = JSON.parse(msg.content.toString())
        if (content.type === 'user_login_log') {
            const data = content.data as LoginLogDoc;
            await userLogService.createLoginLog(data).catch(() => {
                channel.reject(msg, false)
            })
        }

        return channel.ack(msg)
    }

    getConfig(): ProcessorConfig {
        return {
            exchange: 'direct_exchange',
            queue: 'user_log',
            routingKey: 'user-log',
            config: {
                autoDelete: false,
                durable: true,
            }
        }
    }
}

export const userLogProcessor = new UserLogProcessor();