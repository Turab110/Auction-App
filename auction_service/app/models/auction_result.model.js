const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Auction_result_Schema = new Mongoose.Schema({
    auction_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user_auction',  
        required: true
    },
    bid_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'auction_bid',  
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
    status: {
        type: Number, 
        required: true
    },
});

//below line will automatically generate createdAt & updatedAt fields
Auction_result_Schema.set('timestamps', true);

module.exports.auction_result = Mongoose.model("auction_result", Auction_result_Schema);