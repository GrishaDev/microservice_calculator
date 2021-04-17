const rabbitmq = require('amqplib');
const calculate = require('../app');
const config = require('../config');
const sleep = require('../utils/sleep');
const { logError, log } = require('../logger');

// const resultsQueue = config.resultsQueue;
const infoQueue = config.infoQueue;
const errorQueue = config.errorQueue;

let connection;
let channel;

const connectRabbitmq = async () => {
    connection = await rabbitmq.connect(config.brokerUrl).catch(err => {throw new Error('failed connecting to rabbitmq')});
    console.log(`rabbitmq connected to ${config.brokerUrl}`);
    
    channel = await connection.createChannel();

    await channel.assertQueue (infoQueue, {durable: true});
    await channel.assertQueue (errorQueue, {durable: true});

    channel.consume(infoQueue, async (msg) => {
        console.log('consume info');
        const msgParsed = JSON.parse(msg.content.toString());
        log(msgParsed);
        channel.ack(msg);
    });

    channel.consume(errorQueue, async (msg) => {
        console.log('consume error');
        const msgParsed = JSON.parse(msg.content.toString());
        logError(msgParsed);
        channel.ack(msg);
    });
}

const rabbitmqProduce = async (queue, data) => {
    await channel.assertQueue (queue, {durable: true});
    await channel.sendToQueue (queue, Buffer.from(JSON.stringify(data)));
}


module.exports = { connectRabbitmq, rabbitmqProduce }