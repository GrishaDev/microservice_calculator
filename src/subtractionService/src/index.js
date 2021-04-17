const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const { connectRabbitmq } = require('./broker/rabbitmq');
const config = require('./config');

(async () => {
    try {
        await connectRabbitmq();
        console.log(`${config.serviceType} service started`);
    }
    catch(err) {
        console.log(err);
        process.exit();
    }
})();