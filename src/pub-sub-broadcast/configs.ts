import { logFunction } from ".";

export const configs = {
    url: 'amqp://',
    port: 5672,
    subscriptions: [
        { channel: 'logs', action: logFunction }
    ] 
}