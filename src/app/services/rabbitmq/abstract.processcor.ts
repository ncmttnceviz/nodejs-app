import {ProcessorConfig} from "./rabbitmq.interface";
import {Channel, ConsumeMessage} from "amqplib";

export abstract class AbstractProcessor {

    abstract  processor(channel: Channel, msg: ConsumeMessage | null) : void

    abstract getConfig(): ProcessorConfig

}