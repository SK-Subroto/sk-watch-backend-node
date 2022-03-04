const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },
    madeBy: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product