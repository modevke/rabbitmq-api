import { warningfunction } from ".";

export const configs = {
    url: 'amqp://',
    port: 5672,
    subscriptions: [
        { channel: 'notify', severities: [
            { name: 'warning', action: warningfunction}
        ] }
    ] 
}