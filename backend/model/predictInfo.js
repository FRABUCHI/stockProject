var mongoose = require("mongoose");

var predictSchema = mongoose.Schema({
    company: String,
    present_price: Number,
    predict_price: Number,
    state: Number
});

module.exports = mongoose.model('predict', predictSchema, 'stockUpList');