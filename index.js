const app = require("express")()
import router from "./main/router_cre";
app.use(router)
app.listen(3000,() =>{
    console.log("Server is running on port 3000")
    console.log("URL_ADDRESS")
})