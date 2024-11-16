const express = require("express");
const router = require("./main/router/router_cre.js");
const log4js = require("log4js");

const Logger = log4js.getLogger();
// 配置 log4js
log4js.configure({
  appenders: {
    console: { type: 'console' },
    app: { type: 'file', filename: 'app.log' }
  },
  categories: {
    default: { appenders: ['console', 'app'], level: 'info' }
  }
});
const app = express()
app.use(express.json())
app.use(router)
const port = 3000
app.listen(port,() =>{
    Logger.info(`Server run successfully at port 3000`)
    Logger.info(`http://localhost:3000`)
    
})

