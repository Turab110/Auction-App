const Mongoose = require("mongoose")
var Float = require('mongoose-float').loadType(Mongoose);

/**
 * Category Schema
 */
 const UserAuction_Schema = new Mongoose.Schema({
    product_name:{
        type: String,
        required: true,
        lowercase: true,
    },
    product_detail:{
        type: String,
        required: true,
    },
    product_descrip:{
        type: String,
        required: true,
    },
    product_feature:{
        type: String,
        required: true,
    },
    price: {
        type: Number, 
        required: true
    },
    minimum_bid: {
        type: Number, 
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    assign_feature_id: {
        type: String, 
        required: true
    },
    longitude: {
        type: Float, 
        required: true
    },
    latitude: {
        type: Float, 
        required: true
    },
    user_id: {
        type: String, 
        required: true
    },
    auction_type_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'auction_type',  
        required: true
    },
    sub_cat_id: {
        type: String, 
        required: true
    },
    brand_id: {
        type: String, 
        required: true
    },
    status: {
        type: Number, 
        required: true
    },
});

//below line will automatically generate createdAt & updatedAt fields
UserAuction_Schema.set('timestamps', true);

module.exports.user_auction = Mongoose.model("user_auction", UserAuction_Schema);