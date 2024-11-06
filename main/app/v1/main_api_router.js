import New_question_router from "./new_question.js";
import {Router} from "express";

const router = Router();
router.use("/nq", New_question_router);

export default router;