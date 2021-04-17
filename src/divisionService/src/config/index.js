module.exports = { 
    env: process.env.NODE_ENV,
    serviceType: process.env.SERVICE_TYPE,
    brokerUrl: process.env.RABBITMQ_URL,
    resultsQueue: process.env.RESULTS_QUEUE,
    serviceQueue: process.env.SERVICE_QUEUE
}