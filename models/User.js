const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    cart: [Object]
})

module.exports = mongoose.model('User', UserSchema)