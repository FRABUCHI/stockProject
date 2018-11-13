// load the things we need 
var mongoose = require('mongoose');

// define the schema for our favourites model 
var favouritedItemsSchema = mongoose.Schema({
    userId: Number,
    item: [
        {
            itemId: Number,
            addedDate: Date
        }
    ]
});