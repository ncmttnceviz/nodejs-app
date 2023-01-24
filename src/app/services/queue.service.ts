import {rabbitMqConnect} from "@config/rabbitmq.config";
import {Channel, Connection} from "amqplib";
import {AbstractProcessor} from "./rabbitmq/abstract.processcor";

export class QueueService {

    async sendCommand(queue: AbstractProcessor, message: object) {
        const connection: Connection = await rabbitMqConnect()
        const channel: Channel = await connection.createChannel();
        const config = queue.getConfig();

        return channel.publish(config.exchange, config.routingKey, Buffer.from(JSON.stringify(message)))
    }

}

export const queueService = new QueueService();