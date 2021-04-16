module.exports = { 
    env: process.env.NODE_ENV,
    dbOptions: { useUnifiedTopology: true , useNewUrlParser: true },
    dbUrl: process.env.MONGODB_URL,
    dbUrlTest: process.env.MONGODB_URL_TEST,
    brokerUrl: process.env.RABBITMQ_URL
}