const jwt = require('jsonwebtoken')
require("dotenv/config")

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.token
        const username = await jwt.verify(token, process.env.secret_word).username
        req.username = username
        next()
    } catch (e) {
        res.status(200).json({ message: "you are not authorized", authorized: false })
    }
}

module.exports = authenticateToken