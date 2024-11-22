const auth_account_api = require("express").Router();
const Snowflake = require("../../tools/snowflakeInstance.js");
const connection = require("../../db/conn_db.js");
const crypto = require("crypto-js");
const Jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET } = require("../../../tools.js");
const log4js = require("log4js");
const Logger = log4js.getLogger();


auth_account_api.post("/register", (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = crypto.SHA512(password).toString();
    const id = Snowflake.nextId();

    const values = [id, username, hashedPassword];
    Logger.debug(`Register request from ${req.ip}`);

    connection.query(`INSERT INTO user (user_id, username, password) VALUES (?, ?, ?)`,
        values, (err, result) => {            
        if (err) {
            // 1062 error 主键冲突
            if (err.errno === 1062) {
                Logger.warn(`Username conflict for ${username} from ${req.ip}`);
                res.status(400).json({
                    status: 400,
                    message_cn: '此用户名已经存在',
                    message_en: 'Username already exists'
                });
                return;
            }
            Logger.error(`Error executing query from ${req.ip}: ${err.message}`, err);
            res.status(500).json({
                status: 500,
                message_cn: "内部服务器错误",
                message_en: "Internal Server Error"
            });
            return;
        }
        Logger.info(`User from ${req.ip} registered successfully`);
        res.status(201).json({
            status: 201,
            message_cn: "注册成功",
            message_en: "User registered successfully"
        });
    });
});

auth_account_api.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        Logger.warn(`Username or password is null from ${req.ip}`);
        res.status(400).json({
            status: 400,
            message_en: "Username or password must not be null",
            message_cn: "用户名和密码不能为空"
        });
        return;
    }

    const hashedPasswordInput = crypto.SHA512(password).toString();

    connection.query(`SELECT user_id, password FROM user WHERE username = ?`, [username], (err, result) => {
        if (err) {
            Logger.error(`Error executing query from ${req.ip}: ${err.message}`, err);
            res.status(500).json({
                status: 500,
                message_cn: "错误",
                message_en: "Internal Server Error"
            });
            return;
        }

        if (result.length === 0) {
            Logger.warn(`User ${username} does not exist from ${req.ip}`);
            res.status(400).json({
                status: 400,
                message_cn: "用户不存在",
                message_en: "User does not exist"
            });
            return;
        }

        const userId = result[0].id;
        const hashedPasswordDB = result[0].password;

        if (hashedPasswordDB === hashedPasswordInput) {
            const payload = {
                user_id: userId,
                login_time: Date.now()
            };
            const token = Jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "5h" });

            Logger.info(`User ${username} logged in successfully from ${req.ip}`);
            res.status(200).json({
                status: 200,
                message_cn: "登录成功",
                message_en: "Login Success",
                user_id: userId,
                token: token
            });
            return;
        } else {
            Logger.warn(`Incorrect password for user ${username} from ${req.ip}`);
            res.status(400).json({
                status: 400,
                message_cn: "密码错误",
                message_en: "Password is wrong"
            });
            return;
        }
    });
});

module.exports =  auth_account_api;