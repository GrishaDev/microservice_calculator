const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const { connectRabbitmq } = require('./broker/rabbitmq');
const startApp = require('./app.js');
const { initLogger, log } = require('./logger');
const config = require('./config');

(async () => {
    try {
        initLogger();
        startApp(config.httpPort);
        await connectRabbitmq();
        console.log(`${config.serviceType} service started`);
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
})();