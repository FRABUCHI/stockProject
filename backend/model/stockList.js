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
module.exports = mongoose.model('stock', stockSchema, 'stockList');