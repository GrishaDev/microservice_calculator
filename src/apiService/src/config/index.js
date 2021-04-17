const booleanEnvParser = require('../utils/booleanEnvParser');

module.exports = { 
    env: process.env.NODE_ENV,
    httpPort: process.env.PORT,
    isAuth: booleanEnvParser(process.env.IS_AUTH),
    dbOptions: { useUnifiedTopology: true , useNewUrlParser: true },
    dbUrl: process.env.MONGODB_URL,
    dbUrlTest: process.env.MONGODB_URL_TEST,
    brokerUrl: process.env.RABBITMQ_URL,
    authUrl: process.env.AUTH_SERVICE,
    jwtPublic: process.env.JWT_PUBLIC,
    resultsQueue: process.env.RESULTS_QUEUE,
    additionQueue: process.env.ADDITION_QUEUE,
    subtractionQueue: process.env.SUBTRACTION_QUEUE,
    multiplicationQueue: process.env.MULTIPLICATION_QUEUE,
    divisionQueue: process.env.DIVISION_QUEUE,
    logInfoQueue: process.env.LOG_INFO_QUEUE,
    logErrorQueue: process.env.LOG_ERROR_QUEUE,
}