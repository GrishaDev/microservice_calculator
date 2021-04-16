const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const { connectRabbitmq } = require('./broker/rabbitmq');

(async () => {
    connectRabbitmq().catch(err => console.log(err));
    console.log('addition service started');
})()