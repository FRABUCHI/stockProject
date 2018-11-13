var mongoose = require("mongoose");

var stockSchema = mongoose.Schema({
    id: String,
    company: String,
    open: String,
    close: String,
    hign: String,
    low: String,
    volume: String
});

var stock = mongoose.model('stock', stockSchema, 'Stocklist');
module.exports = stock;