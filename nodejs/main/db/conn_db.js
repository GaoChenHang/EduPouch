
const mysql = require('mysql');
const log4js = require('log4js');
const Logger = log4js.getLogger();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "iqweb",
    supportBigNumbers: true,
    bigNumberStrings: true,
    connectTimeout: 5000 // 设置连接超时时间为5秒
});
connection.connect((err) => {
    if (err) {
        Logger.error('数据库连接失败:', err);
        return;
    }
    // 首次检查连接

    checkConnection();
});
const checkConnection = () => {
    connection.query('SELECT VERSION() AS version', (err, result) => {
        if (err) {
            Logger.error(`MySQL 连接失败 ${err}`);
            // 重试机制
            setTimeout(() => {
                checkConnection();
            }, 5000); // 5秒后重试

        } else {
            Logger.info(`MySQL 连接成功 版本号：${result[0].version} 用户名：${connection.config.user}`);
        }
    });
};


setInterval(checkConnection, 60000);
module.exports = connection;
