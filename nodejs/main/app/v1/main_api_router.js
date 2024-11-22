const AuthAccount = require("./auth_account_api.js");
const {Router} = require("express");
const New_question_router = require("./new_question.js");
const router = Router();
router.use("/nq", New_question_router);
router.use("/auth",AuthAccount)
module.exports = router;