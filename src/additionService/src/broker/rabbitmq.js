const rabbitmq = require('amqplib');
const calculate = require('../app');
const config = require('../config');
const sleep = require('../utils/sleep');

const resultsQueue = config.resultsQueue;
const serviceQueue = config.serviceQueue;
let connection;
let channel;

const connectRabbitmq = async () => {
    connection = await rabbitmq.connect(config.brokerUrl);
    channel = await connection.createChannel();

    await channel.assertQueue (serviceQueue, {durable: true});

    channel.consume(serviceQueue, async (msg) => {
        console.log('consume');
        const msgParsed = JSON.parse(msg.content.toString());
        const { calcId, data } = msgParsed;
        const { number1, number2 } = data;
        await sleep(5000);
        const result = calculate(number1, number2);
        const calculatedData = {calcId, data: {result, operationType: 'addition'}}
        await rabbitmqProduce(resultsQueue, calculatedData)
        channel.ack(msg);
    })
}

const rabbitmqProduce = async (queue, data) => {
    await channel.assertQueue (queue, {durable: true});
    await channel.sendToQueue (queue, Buffer.from(JSON.stringify(data)));
}


module.exports = { connectRabbitmq, rabbitmqProduce }