const express = require('express')
const Watch = require('../../models/Watch')
require("dotenv/config")
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const match = await Watch.findOne({ name: req.body.name })

        if (match === null) {  // checking if there is no watches with the same name
            console.log(req.body)
            const watch = new Watch({
                name: req.body.name,
                price: +req.body.price,
                manufacturer: req.body.manufacturer,
                description: {
                    hasDescription: !!req.body.description,
                    ...req.body.description
                },
                inStock: req.body.inStock,
                hasDiscount: req.body.hasDiscount,
                discount: req.body.discount
            })

            await watch.save()
            res.status(200).json({ message: 'watch has been successfully inserted to DB' })
        } else res.status(400).json({ message: 'This name has already been declared' })

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'server error' })
    }
})

module.exports = router