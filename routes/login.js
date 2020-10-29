const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv/config")
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const userMatch = await User.findOne({ "email": req.body.emailOrUsername })
            || await User.findOne({ "username": req.body.emailOrUsername })

        if (userMatch === null) {
            res.status(200).json({ message: "Incorrect email or username", resultCode: 1 })
        } else {
            const passwordMatch = bcrypt.compare(req.body.password, userMatch.password)
            if (!passwordMatch) {
                res.status(200).json({ message: "Incorrect password", resultCode: 1 })
            } else {

                var token = await jwt.sign({ "username": userMatch.username }, process.env.secret_word)
                delete userMatch._doc.password
                res.status(200).json({ message: "You have successfully logged in", resultCode: 0, user: userMatch, token })
            }
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "serverError" })
    }
})

module.exports = router