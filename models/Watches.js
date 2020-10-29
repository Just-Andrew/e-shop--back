const mongoose = require('mongoose')
const WatchesSchema = mongoose.Schema({
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
    inStock: Boolean,
    hasDiscount: Boolean,
    discount: Number
})

module.exports = mongoose.model('Watches', WatchesSchema)