const mongoose = require('mongoose')
const WatchSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        hasDescription: { type: Boolean, required: true, default: false },
        sex: { type: String, required: false },
        style: { type: String, required: false },
        mass: { type: String, required: false },
        size: { type: String, required: false }
    },
    inStock: { type: Boolean, required: true, default: true },
    hasDiscount: { type: Boolean, required: true, default: false },
    discount: { type: Number, required: true, default: 0 }
})

module.exports = mongoose.model('Watches', WatchSchema)