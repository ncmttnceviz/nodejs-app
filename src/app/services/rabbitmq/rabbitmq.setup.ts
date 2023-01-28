import {ExchangeConfig} from "./rabbitmq.interface";
import {AbstractProcessor} from "./abstract.processcor";
import {Channel, Connection, ConsumeMessage,} from "amqplib";
import {userLogProcessor} from "@processor/user-log.processor";
import {sendEmailProcessor} from "@processor/send-email.processor";

export class RabbitmqSetup {

    constructor(public connection: Connection) {
        this.init();
    }

    async init() {
        const channel = await this.connection.createChannel();

        await this.assertExchanges(channel)
        await this.assertQueues(channel)
        await this.consumeQues()
    }

    private async assertExchanges(channel: Channel) {
        const exchanges = this.exchanges();
        exchanges.map(async (exchange: ExchangeConfig) => {
            try {
                await channel.assertExchange(exchange.name, exchange.type, exchange.config)
            } catch (err) {
                throw err;
            }
        })
    }

    private async assertQueues(channel: Channel) {
        const queues = this.processors();
        queues.map(async (queue) => {
            const config = queue.getConfig()
            try {
                const queue = process.env.APP_ENV === 'dev' ? 'dev:' + config.queue : config.queue
                const routingKey = process.env.APP_ENV === 'dev' ? 'dev:' + config.routingKey : config.routingKey
                await channel.assertQueue(queue, config.config)
                await channel.bindQueue(queue, config.exchange, routingKey)
            } catch (err) {
                throw err
            }
        })
    }

    private async consumeQues() {
        setTimeout(async () => {
            const processors = this.processors();
            const channel = await this.connection.createChannel();
            processors.map((processor) => {
                const consumer = (channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
                    if (msg) return processor.processor(channel, msg);
                }
                const queue = process.env.APP_ENV === 'dev' ? 'dev:' + processor.getConfig().queue : processor.getConfig().queue;
                channel.consume(queue, consumer(channel))
            })
        }, 1000)
    }

    private exchanges(): Array<ExchangeConfig> {
        return [
            {
                type: 'direct',
                name: 'direct_exchange',
                config: {
                    autoDelete: false,
                    durable: true,
                    internal: false
                }
            },
            {
                type: 'fanout',
                name: 'fanout_exchange',
                config: {
                    autoDelete: false,
                    durable: true,
                    internal: false
                }
            },
        ]
    }

    private processors(): Array<AbstractProcessor> {
        return [
            userLogProcessor,
            sendEmailProcessor
        ]
    }
}

