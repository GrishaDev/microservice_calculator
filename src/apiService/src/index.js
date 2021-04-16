const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const startApp = require('./app.js');
const { connectRabbitmq } = require('./broker/rabbitmq');
const connectDb = require('./database');

(async () => {
    startApp(3000);
    connectRabbitmq().catch(err => console.log(err));
    connectDb();
})()