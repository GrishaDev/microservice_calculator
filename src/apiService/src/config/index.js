module.exports = { 
    env: process.env.NODE_ENV,
    dbOptions: { useUnifiedTopology: true , useNewUrlParser: true },
    dbUrl: process.env.MONGODB_URL,
    dbUrlTest: process.env.MONGODB_URL_TEST,
    brokerUrl: process.env.RABBITMQ_URL,
    resultsQueue: process.env.RESULTS_QUEUE,
    additionQueue: process.env.ADDITION_QUEUE,
    subtractionQueue: process.env.SUBTRACTION_QUEUE,
    multiplicationQueue: process.env.MULTIPLICATION_QUEUE,
    divisionQueue: process.env.DIVISION_QUEUE,
}