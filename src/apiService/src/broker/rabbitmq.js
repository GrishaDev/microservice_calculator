const rabbitmq = require('amqplib');
const Repository = require('../database/repository');
const config = require('../config');

const resultsQueue = config.resultsQueue;
let connection;
let channel;

const connectRabbitmq = async () => {
    connection = await rabbitmq.connect(config.brokerUrl);
    console.log(`rabbitmq connected to ${config.brokerUrl}`);

    channel = await connection.createChannel();

    await channel.assertQueue (resultsQueue, {durable: true});

    channel.consume(resultsQueue, async (msg) => {
        console.log('consume');
        const msgParsed = JSON.parse(msg.content.toString());
        const { calcId, data } = msgParsed;
        await Repository.updateCalculation(calcId, data);
        channel.ack(msg);
    })
}

const rabbitmqProduce = async (queue, data) => {
    await channel.assertQueue (queue, {durable: true});
    await channel.sendToQueue (queue, Buffer.from(JSON.stringify(data)));
}


module.exports = { connectRabbitmq, rabbitmqProduce }