module.exports = { 
    env: process.env.NODE_ENV,
    authPort: process.env.AUTH_PORT,
    brokerUrl: process.env.RABBITMQ_URL,
    jwtSecret: process.env.JWT_SECRET,
    tokenDuration: process.env.JWT_DURATION,
    logInfoQueue: process.env.LOG_INFO_QUEUE,
    logErrorQueue: process.env.LOG_ERROR_QUEUE,
}