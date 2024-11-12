// api url /auth/
import { Router } from "express";
import Snowflake from "../../tools/snowflakeInstance.js";
import connection from "../../db/conn_db.js";
import CryptoJS from "crypto-js";
import Jsonwebtoken from "jsonwebtoken";
import { jwt_secret } from "../../../tools.js";

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
            console.error('Error executing query:', err);
            // 1062 error 主键冲突
            if(err.errno === 1062){
                res.status(400).json({
                    status:400,
                    message_cn: '此用户名已经存在' 
                });
                return
            }
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('User registered successfully');
        res.status(201).json({
            status:201,
            message_cn:"注册成功",
            message_en:"User registered successfully"
        });
        return
    });
});
auth_account.post("/login",(req,res) =>{
    const {username,password} = req.body
    if (!username||!password){
        res.status(400).json({
            status:400,
            message_en:"username or password must be not null",
            message_cn:"用户名和密码不能为空"
        })
        return
    }
    const hashedPasswordInput = CryptoJS.SHA512(password).toString();
    

    connection.query(`SELECT id,password from user where username=?`,[username],(err,result)=>{
            if (err){
                console.error('Error executing query:', err);
                res.status(500).json({
                    status:500,
                    message_cn:"错误",
                    message_en:"Internal Server Error"
                })
                return
            }
            if (result.length === 0){
                res.status(400).json({
                    status:400,
                    message_cn:"用户不存在",
                    message_en:"User does not exist"
                })
                return
            }
            console.log(result)
            const userId = result[0].id; 
            
            const hashedPasswordDB = result[0].password
            if (hashedPasswordDB === hashedPasswordInput){
                const payload = {
                    user_id:userId,
                    login_time: Date.now()
                }
                const token = Jsonwebtoken.sign(payload,jwt_secret,{expiresIn:"5h"})
                res.status(200).json({
                    status:200,
                    message_cn:"登录成功",
                    message_en:"Login Success",
                    user_id:userId,
                    token:token
                })
                return
            }else{
                res.status(400).json({
                    status:400,
                    message_cn:"密码错误",
                    message_en:"Password is wrong"
                })
                return
            }
            
    })
})

export default auth_account;