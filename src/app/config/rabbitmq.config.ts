import client, {Connection} from "amqplib";
import {appHelper} from "@helper/app.helper";


const rabbitMq: () => Promise<Connection> = async () => {
    return await client.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`)
}

export const rabbitMqConnect = async () => {
    appHelper.checkEnvFields(['RABBITMQ_HOST', 'RABBITMQ_PORT', 'RABBITMQ_USER', 'RABBITMQ_PASS','QUEUE_PREFIX']);
    return await rabbitMq().catch(() => {
        throw new Error('RabbitMq Connection Error')
    })
}


