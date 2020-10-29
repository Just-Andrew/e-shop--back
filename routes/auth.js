const express = require('express')
const authenticateToken = require('../middleWares/authenticateToken')
const User = require('../models/User')
require("dotenv/config")
const router = express.Router()

router.get('/', authenticateToken, async (req, res) => {
    const user = await User.findOne({ username: req.username })
    res.status(200).json({ message: "You are authorized", authorized: true, user })
})

module.exports = router