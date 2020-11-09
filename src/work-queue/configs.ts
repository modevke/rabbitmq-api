import { demofunction } from ".";

export const configs = {
    url: 'amqp://',
    port: 5672,
    subscriptions: [
        { channel: 'notify', action: demofunction }
    ] 
}