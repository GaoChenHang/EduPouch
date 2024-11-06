import router_list from "./router_list.js";
import * as path from "node:path";
import {root_path} from "../../tools.js";
import {Router} from "express";
import Main_api_router from "../app/v1/main_api_router.js";

const router = Router();

// 遍历router_list，为每个路由页面添加对应的处理函数
for (const routerListElement of router_list) {
    router.get(routerListElement.url, (req, res) => {
        const filePath = path.join(root_path(),'main/html', routerListElement.file_path);
        res.sendFile(filePath);
    });
}
router.use('/v1',Main_api_router)

export default router;