const express = require("express");
const router = require("./main/router/router_cre.js");
const log4js = require("./main/tools/LoggerConfig.js");
const Logger = log4js.getLogger();

const app = express()
app.use(express.json())
app.use(router)
const port = 3000
app.listen(port,() =>{
    Logger.info(`Server run successfully at port 3000`)
    Logger.info(`http://localhost:3000`)
})