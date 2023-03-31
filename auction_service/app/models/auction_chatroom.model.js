const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Auction_chatroom_Schema = new Mongoose.Schema({
    auction_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user_auction',  
        required: true
    },
    seller_id: {
        type: Number,
        required: true
    },
    buyer_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    status: {
        type: Number, 
        required: true
    },
});

//below line will automatically generate createdAt & updatedAt fields
Auction_chatroom_Schema.set('timestamps', true);

module.exports.auction_chatroom = Mongoose.model("auction_chatroom", Auction_chatroom_Schema);