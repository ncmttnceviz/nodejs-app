import {AbstractProcessor} from "../app/services/rabbitmq/abstract.processcor";
import {ProcessorConfig} from "../app/services/rabbitmq/rabbitmq.interface";
import {Channel, ConsumeMessage} from "amqplib";

export class TestProcessor extends AbstractProcessor {

    async processor(channel: Channel, msg: ConsumeMessage) {
        console.log(msg.content.toString() + '' + '111111')
        channel.ack(msg, true)
    }

    getConfig(): ProcessorConfig {
        return {
            exchange: 'direct_exchange',
            queue: 'test',
            routingKey: 'test-1',
            config: {
                autoDelete: false,
                durable: true,
            }
        }
    }

}

export const testProcessor = new TestProcessor();