const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Auction_bid_Schema = new Mongoose.Schema({
    auction_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user_auction',  
        required: true
    },
    buyer_id: {
        type: Number,
        required: true
    },
    bid_amount: {
        type: Number, 
        required: true
    },
    datetime: {
        type: Date, 
        required: true
    },
    status: {
        type: Number, 
        required: true
    },
});

//below line will automatically generate createdAt & updatedAt fields
Auction_bid_Schema.set('timestamps', true);

module.exports.auction_bid = Mongoose.model("auction_bid", Auction_bid_Schema);