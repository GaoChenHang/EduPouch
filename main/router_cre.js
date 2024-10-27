import router_list from "./router_list";
import * as path from "node:path";
import {root_path} from "../tools";
const router = require('express').Router();
for (const routerListElement of router_list) {
    router.get(routerListElement.url, (req, res) => {
        const filePath = path.join(root_path,'main/html', routerListElement.file_path);
        res.sendFile(filePath);
    });
}
export default router;