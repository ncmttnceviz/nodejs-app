import {ExchangeConfig} from "./rabbitmq.interface";
import {AbstractProcessor} from "./abstract.processcor";
import {testProcessor} from "../../../processcor/test.processcor";
import {Channel, Connection, ConsumeMessage,} from "amqplib";
import {twoProcesscor} from "../../../processcor/two.processcor";

export class RabbitmqSetup {

    constructor(public connection: Connection) {
        this.init();
    }
    async init(){
        const channel = await this.connection.createChannel();

        await Promise.all([
            this.assertExchanges(channel),
            this.assertQueues(channel),
            this.consumeQues(),
        ])
    }

    private async assertExchanges(channel: Channel) {
        const exchanges = this.exchanges();
        exchanges.map(async (exchange: ExchangeConfig) => {
            try {
                await channel.assertExchange(exchange.name, exchange.type, exchange.config)
            }catch (err){
                throw err;
            }
        })
    }

    private async assertQueues(channel: Channel) {
        const queues = this.proceccors();
        queues.map(async (queue) => {
            const config = queue.getConfig()
            try {
                await channel.assertQueue(config.queue,config.config)
                await channel.bindQueue(config.queue,config.exchange,config.routingKey)
            }catch (err){
                throw err
            }
        })
    }

    private async consumeQues() {
        const processors = this.proceccors();
        const channel = await this.connection.createChannel();
        processors.map((processor) => {
            const consumer = (channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
                return processor.processor(channel, msg);
            }

            channel.consume(processor.getConfig().queue, consumer(channel))
        })
    }

    private exchanges(): Array<ExchangeConfig> {
        return [
            {
                type: 'direct',
                name: 'direct_exchange',
                config:{
                    autoDelete: false,
                    durable: true,
                    internal: false
                }
            },
            {
                type: 'fanout',
                name: 'fanout_exchange',
                config:{
                    autoDelete: false,
                    durable: true,
                    internal: false
                }
            },
        ]
    }

    private proceccors(): Array<AbstractProcessor>{
        return [
            testProcessor,
            twoProcesscor
        ]
    }
}

