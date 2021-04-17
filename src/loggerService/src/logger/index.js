const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const config = require('../config');

const ERROR = 'error';
const INFO = 'info';

let errorLogger;
let infoLogger;

const initLogger = () => {

    errorLogger = createMyLogger(ERROR);
    infoLogger = createMyLogger(INFO);

    console.log('logger configured');
};

const createMyLogger = type => {

    const dailyRotates = new DailyRotateFile({
        filename: path.resolve(__dirname, `../../logs/${type}/%DATE%-${type}.log`),
        datePattern: 'DD-MM-YYYY',
        maxSize: '50m'
    });

    const logger = createLogger({
        format: format.combine(
            format.timestamp({
                format: 'DD-MM-YYYY HH:mm:ss'
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        ),
        transports: [
            dailyRotates
        ]
    });

    if(config.env !== 'test') {
        logger.add(new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }));
    }

    return logger;
}

const logError = (err) => {
    errorLogger.log({
        level: ERROR,
        message: err,
    });
}

const log = (msg) => {
    infoLogger.log({
        level: INFO,
        message: msg,
    });
}

module.exports = { initLogger, logError, log }