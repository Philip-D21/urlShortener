const winston = require('winston');

const options = {
    files:{
        levels: 'info',
        filename: "./logs/app.log",
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5, 
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};



const logger = winston.createLogger({
  level: winston.config.npm.levels,
  
  transports: [
   
    new winston.transports.File(options.files),
    new winston.transports.File(options.console),
  ],
  exitOnError: false
});

module.exports = logger;