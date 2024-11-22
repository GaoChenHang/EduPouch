const Jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET } = require("../../tools.js");

module.exports = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 401,
            message_cn: "未授权",
            message_en: "Unauthorized"
        });
    }

    Jsonwebtoken.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 401,
                message_cn: "未授权",
                message_en: "Unauthorized"
            });
        }
        req.user_id = decoded.user_id;
        next();
    });
};
