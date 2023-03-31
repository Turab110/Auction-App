const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Auction_type_Schema = new Mongoose.Schema({
    auction_type_name:{
        type: String,
        required: true,
        lowercase: true,
    },
    status: {
        type: Number, 
        required: true
    },
});

//below line will automatically generate createdAt & updatedAt fields
Auction_type_Schema.set('timestamps', true);

module.exports.auction_type = Mongoose.model("auction_type", Auction_type_Schema);