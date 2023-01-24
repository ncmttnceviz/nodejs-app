import {AbstractProcessor} from "../app/services/rabbitmq/abstract.processcor";
import {Channel, ConsumeMessage} from "amqplib";
import {ProcessorConfig} from "../app/services/rabbitmq/rabbitmq.interface";

export class TwoProcesscor extends AbstractProcessor {

    async processor(channel: Channel, msg: ConsumeMessage) {
        console.log(msg.content.toString() + '' + '222222')
        channel.ack(msg, true)
    }

    getConfig(): ProcessorConfig {
        return {
            exchange: 'direct_exchange',
            queue: 'two',
            routingKey: 'two-key',
            config: {
                autoDelete: false,
                durable: true,
            }
        }
    }

}

export const twoProcesscor = new TwoProcesscor();