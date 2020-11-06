const express = require('express')
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/', async (req, res) => {
    const emailMatch = await User.findOne({ "email": req.body.email })
    const usernameMatch = await User.findOne({ "username": req.body.username })
    if (emailMatch !== null) {
        res.status(400).json({ message: "This email has already been declared", "resultCode": 1 })
    } else if (usernameMatch !== null) {
        res.status(400).json({ message: "This username has already been declared", "resultCode": 1 })
    } else {
        const password = await bcrypt.hash(req.body.password.trim(), 10)
        const user = new User({
            email: req.body.email.trim(),
            username: req.body.username.trim(),
            password
        })
        try {
            await user.save()
            var token = await jwt.sign({ "username": user.username }, process.env.secret_word)
            res.status(200).json({ message: "You have been successfully registered", resultCode: 0, user, token })
        } catch (e) {
            console.log(e)
            res.status(500).json("Server Error")
        }
    }
})

module.exports = router