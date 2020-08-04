import winston from 'winston';
import config from '../config';

const winstonOptions = {
    level: config.LOG_LEVEL || 'debug',
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
    },
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        winston.format.json(),
        winston.format.printf(
            info => `${info.level} (${info.timestamp}): ${info.message}`,
        ),
    ),
    transports: [
        new winston.transports.Console(),
    ],
};

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    dev: 'cyan',
});

const logger = winston.createLogger(winstonOptions);

export default logger;
