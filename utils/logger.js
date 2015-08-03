var winston = require('winston'),
    config = require('./../utils/common').config();
    winston.emitErrs = true;
/**
 * @type {exports.Logger}
 * Two standard appender are used for logging; console and file. In winston nomenclature these are the transports on which logs are written
 */
var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'debug',
            filename: config.logger.file,
            handleExceptions: true,
            json: true,
            maxsize: config.logger.maxsize,
            maxFiles: config.logger.maxfile,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;

/*
* Slicing is required because the winston transporter prints an extra line after every log statement
* */
module.exports.stream = {
    write: function(message){
        logger.info(message.slice(0, -1));
    }
};
