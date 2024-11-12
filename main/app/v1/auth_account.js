// api url /auth/
import { Router } from "express";
import Snowflake from "../../tools/snowflakeInstance.js";
import connection from "../../db/conn_db.js";
import CryptoJS from "crypto-js";

const auth_account = Router();

auth_account.post("/register", (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = CryptoJS.SHA512(password).toString();
    const id = Snowflake.nextId();

    const values = [id, username, hashedPassword];
    console.log(values)

    connection.query(`INSERT INTO user (id, username, password) VALUES (?, ?, ?)`, 
        values, (err, result) => {
            
        if (err) {
            // 1062 error 主键冲突
            if(err.errno === 1062){
                res.status(400).json(
                    {
                    status:400,
                     
                    message_cn: '此用户名已经存在' 
                    }
                );
            }
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('Query result:', result);
        res.status(201).json({
            status:201,
            message_cn:"注册成功",
            message_en:"User registered successfully"
        });
    });
});

export default auth_account;