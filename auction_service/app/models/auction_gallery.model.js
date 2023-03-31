const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Auction_gallery_Schema = new Mongoose.Schema({
    auction_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user_auction',  
        required: true
    },
    product_image: {
        type: String, 
        required: true
    },
    status: {
        type: Number, 
        required: true
    },
});

//below line will automatically generate createdAt & updatedAt fields
Auction_gallery_Schema.set('timestamps', true);

module.exports.auction_gallery = Mongoose.model("auction_gallery", Auction_gallery_Schema);