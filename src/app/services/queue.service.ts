import {rabbitMqConnect} from "@config/rabbitmq.config";
import {Channel, Connection} from "amqplib";
import {AbstractProcessor} from "./rabbitmq/abstract.processcor";

export class QueueService {

    async sendCommand(queue: AbstractProcessor, message: object) {
        const connection: Connection = await rabbitMqConnect()
        const channel: Channel = await connection.createChannel();
        const config = queue.getConfig();

        const routingKey = process.env.APP_ENV === 'dev' ? 'dev:' + config.routingKey : config.routingKey;
        return channel.publish(config.exchange, routingKey, Buffer.from(JSON.stringify(message)))
    }

}

export const queueService = new QueueService();