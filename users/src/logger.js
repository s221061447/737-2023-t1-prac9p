import winston from 'winston';

// Define logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'users-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

const logInfoMessage = (message) => {
    logger.log({
        level: 'info',
        message: message
    });
};

const logErrorMessage = (message) => {
    logger.log({
        level: 'error',
        message: message
    });
};

const logSuccess = (operation, n1, n2) => {
    logger.log({
        level: 'info',
        message: `${operation} operation successful: ${n1} ${operation} by ${n2}`
    });
};

const logInvalidInput = (n1, n2) => {
    logger.log({
        level: 'error',
        message: `Error performing requested operation due to invalid inputs: ${n1}, ${n2}`
    });
};

export {
    logger,
    logInfoMessage,
    logErrorMessage,
    logSuccess,
    logInvalidInput
};