import amqp from 'amqplib';
import {configs} from './configs';

export default async function(exchange: string, message: string){
    try{
        
        const connection = await amqp.connect(`${configs.url}:${configs.port}`)
        const channel = await connection.createChannel()
        const result = await channel.assertExchange(exchange, 'fanout',{
            durable: false
        })

        channel.publish(exchange, "", Buffer.from(message))
        console.log("Log sent succesfully", message);

        setTimeout(function() {
            connection.close();
            process.exit(0)
        }, 500);
       

    }catch(e){
        console.log(e);
    }
}