const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoritesSchema = new Schema({
    company: String,
    add_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('favorites', favoritesSchema, 'favorites')