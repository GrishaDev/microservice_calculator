const rabbitmq = require('amqplib');
const config = require('../config');

let connection;
let channel;

const connectRabbitmq = async () => {
    connection = await rabbitmq.connect(config.brokerUrl);
    console.log(`rabbitmq connected to ${config.brokerUrl}`);

    channel = await connection.createChannel();
}

const rabbitmqProduce = async (queue, data) => {
    await channel.assertQueue (queue, {durable: true});
    await channel.sendToQueue (queue, Buffer.from(JSON.stringify(data)));
}


module.exports = { connectRabbitmq, rabbitmqProduce }