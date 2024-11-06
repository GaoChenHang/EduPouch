import express from "express";

import router from "./main/router/router_cre.js";
const app = express()
app.use(router)
app.listen(3000,() =>{
    console.log("Server is running on port 3000")
    console.log("URL_ADDRESS")
})