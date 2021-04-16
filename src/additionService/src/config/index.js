module.exports = { 
    env: process.env.NODE_ENV,
    brokerUrl: process.env.RABBITMQ_URL,
    resultsQueue: process.env.RESULTS_QUEUE,
    serviceQueue: process.env.SERVICE_QUEUE
}