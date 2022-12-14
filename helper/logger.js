const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const timezoned = () => {
    return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', formatMatcher: 'basic', localeMatcher: 'lookup' })
}

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: timezoned }),
    winston.format.label({ label: "Jobs Link" }),
    winston.format.prettyPrint()
);

const transport = new DailyRotateFile({
    filename: process.env.LOG_FILE,
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxFiles: '14d',
    prepend: true,
    level: 'info'
});

const logger = winston.createLogger({
    format: logFormat,
    transports: [
        transport,
        new winston.transports.Console()
    ]
})

module.exports = logger