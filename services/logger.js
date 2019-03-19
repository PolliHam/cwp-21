const winston = require('winston');
const moment = require('moment');

class LoggerService{
    constructor(){
        moment.locale('ru');
        this.logger = new winston.createLogger({
            transports: [
                new winston.transports.File({
                    level: 'info',
                    filename: './logs/log.log',
                    json: false,
                    maxsize: 512,
                    colorize: true,
                }),
                new winston.transports.Console({
                    timestamp: true,
                    level: 'info',
                    colorize: true
                })
            ],
            exitOnError: false
        });
    }

    log(req, attachInfo) {
        let time = moment().format('LLLL');
        if (attachInfo) {
            this.logger.info(`${time} ${req.originalUrl} ${req.method} ${attachInfo}`);
        }
        else {
            let query = Object.keys(req.query).length !== 0 ? `\n query: ${JSON.stringify(req.query)}` : "";
            let body = Object.keys(req.body).length !== 0 ? `\n body: ${JSON.stringify(req.body)}` : "";

            this.logger.info(`${time} ${req.originalUrl} ${req.method} ${query} ${body}`);
        }
    }
}

module.exports = LoggerService;