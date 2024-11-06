import mysql from 'mysql';
const connection = mysql.createConnection({
    host:'47.96.122.101',
    user:'user_dev',
    password:'Yr6MsGw26NPxiKKS',
    database:'iqweb'
})
const checkConnection = () => {
    connection.query('SELECT VERSION() AS version', (err, result) => {
        if (err) {
            console.error('MySQL 连接失败');
            console.error(err);
        } else {
            console.log(`MySQL 连接成功 版本号：${result[0].version} 用户名：${connection.config.user}`);
        }
    });
};
// 首次检查连接
checkConnection();
// 每隔1分钟检查一次连接
setInterval(checkConnection, 60000);
export default connection
