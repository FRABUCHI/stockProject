var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Number,
        required: true
    }, 
    favourites: [{id: Array}]
});

module.exports = mongoose.model('user', userSchema, "userlist");