const log4js = require('log4js');
log4js.configure({
    appenders: {
        console: { type: 'console' },
        app: { type: 'file', filename: 'app.log' }
    },
    categories: {
        default: { appenders: ['console', 'app'], level: 'info' }
    }
});
module.exports = log4js