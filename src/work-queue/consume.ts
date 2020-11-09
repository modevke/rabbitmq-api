import amqp from 'amqplib';
import {configs} from './configs';

export default async function(queue: string){
    try{

        const connection = await amqp.connect(`${configs.url}:${configs.port}`)
        const channel = await connection.createChannel()
        const result = await channel.assertQueue(queue, {
            durable: true
        })

        channel.prefetch(1);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {

            const result = configs.subscriptions.find((sb) => sb.channel === queue)
            result.action(msg.content.toString())

            channel.ack(msg);

        }, {
            noAck: false
        })

       

    }catch(e){
        console.log(e);
    }
}