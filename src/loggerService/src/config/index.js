const booleanEnvParser = require('../utils/booleanEnvParser');

module.exports = { 
    env: process.env.NODE_ENV,
    httpPort: process.env.PORT,
    isAuth: booleanEnvParser(process.env.IS_AUTH),
    jwtPublic: process.env.JWT_PUBLIC,
    serviceType: process.env.SERVICE_TYPE,
    brokerUrl: process.env.RABBITMQ_URL,
    infoQueue: process.env.LOG_INFO_QUEUE,
    errorQueue: process.env.LOG_ERROR_QUEUE,
}