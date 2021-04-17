const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const startApp = require('./app.js');
const { connectRabbitmq } = require('./broker/rabbitmq');
const connectDb = require('./database');

(async () => {
    try {
        startApp(3000);
        await connectRabbitmq().catch(err => {throw new Error('failed connecting to rabbitmq')});
        await connectDb();
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
})();