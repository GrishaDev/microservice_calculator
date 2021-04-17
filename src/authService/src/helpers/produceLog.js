const { rabbitmqProduce } = require('../broker/rabbitmq');
const config = require('../config');

const logError = async (msg) => {
    rabbitmqProduce(config.logErrorQueue, msg)
}

const logInfo = async (msg) => {
    rabbitmqProduce(config.logInfoQueue, msg)
}

module.exports = { logError, logInfo }