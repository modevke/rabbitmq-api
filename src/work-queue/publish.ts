import amqp from 'amqplib';
import {configs} from './configs';

export default async function(queue: string, message: string){
    try{

        const connection = await amqp.connect(`${configs.url}:${configs.port}`)
        const channel = await connection.createChannel()
        const result = await channel.assertQueue(queue, {
            durable: true
        })

        channel.sendToQueue(queue, Buffer.from(message), {
            persistent: true
        })

        console.log("Job sent succesfully", message);

        setTimeout(function() {
            connection.close();
        }, 500);

    }catch(e){
        console.log(e);
    }
}