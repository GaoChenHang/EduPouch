import New_question_router from "./new_question.js";
import {Router} from "express";
import Auth_account from "./auth_account.js";

const router = Router();
router.use("/nq", New_question_router);
router.use("/auth",Auth_account)
export default router;