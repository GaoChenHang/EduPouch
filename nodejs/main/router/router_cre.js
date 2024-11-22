const router_list = require("./router_list.js");
const path = require("node:path");
const ROOT_PATH  = require("../../tools.js").ROOT_PATH;
const Express = require("express");
const Router = Express.Router;
const Main_api_router = require("../app/v1/main_api_router.js");


const router = Router();

// 遍历router_list，为每个路由页面添加对应的处理函数
for (const routerListElement of router_list) {
    router.get(routerListElement.url, (req, res) => {
        const filePath = path.join(ROOT_PATH,'main/res/html', routerListElement.file_path);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.sendFile(filePath);
    });
}
router.use('/res', Express.static(path.join(ROOT_PATH,'main/res')));
router.use('/v1',Main_api_router)
module.exports = router