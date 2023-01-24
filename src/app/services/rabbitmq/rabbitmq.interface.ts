import {Options} from "amqplib";

export interface ProcessorConfig {
    exchange: string,
    queue: string,
    routingKey: string,
    config : Options.AssertQueue
}

export interface ExchangeConfig {
    name: string,
    type: 'direct' | 'topic' | 'headers' | 'fanout' | 'match' | string,
    config: Options.AssertExchange
}

