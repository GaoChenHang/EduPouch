import {Router} from "express";
const new_question_router = Router()

new_question_router.post('/', (req, res) => {
    res.send('这是要新建的一个接口的示例')
})

export default new_question_router

