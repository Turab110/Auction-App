const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Auction_report_Schema = new Mongoose.Schema({
    auction_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user_auction',  
        required: true
    },
    buyer_id: {
        type: Number,
        required: true
    },
    complain: {
        type: String, 
        required: true
    },
    status: {
        type: Number, 
        required: true
    },
});

//below line will automatically generate createdAt & updatedAt fields
Auction_report_Schema.set('timestamps', true);

module.exports.auction_report = Mongoose.model("auction_report", Auction_report_Schema);