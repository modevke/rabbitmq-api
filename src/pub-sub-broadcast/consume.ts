import amqp from 'amqplib';
import {configs} from './configs';

export default async function(exchange: string){
    try{

        const connection = await amqp.connect(`${configs.url}:${configs.port}`)
        const channel = await connection.createChannel()
        const result = await channel.assertExchange(exchange, 'fanout', {
            durable: false
        })
        const result2 = await channel.assertQueue("", {
            exclusive: true
        })

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", result2.queue);
        channel.bindQueue(result2.queue, exchange, "")
    
        channel.consume(result2.queue, (msg) => {
            if(msg.content) {
                const result = configs.subscriptions.find((sb) => sb.channel === exchange)
                result.action(msg.content.toString())
            }
        }, {
            noAck: true
        })

       

    }catch(e){
        console.log(e);
    }
}