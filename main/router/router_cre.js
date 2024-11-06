import router_list from "./router_list.js";
import * as path from "node:path";
import {root_path} from "../../tools.js";
import {Router} from "express";

const router = Router();
for (const routerListElement of router_list) {
    router.get(routerListElement.url, (req, res) => {
        const filePath = path.join(root_path,'main/html', routerListElement.file_path);
        res.sendFile(filePath);
    });
}
export default router;