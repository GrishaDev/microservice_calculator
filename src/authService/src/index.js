const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const startApp = require('./app.js');
const { connectRabbitmq } = require('./broker/rabbitmq');
const config = require('./config');

(async () => {
    try {
        startApp(config.authPort);
        await connectRabbitmq().catch(err => {throw new Error('failed connecting to rabbitmq')});
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
})();