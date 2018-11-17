// load the things we need 
var mongoose = require('mongoose');

// define the schema for our model 
var userSchema = mongoose.Schema({
    username: string,
    favourites: [{
        id: Schema.Types.ObjectId,
        addedDate: Date
    }]
});