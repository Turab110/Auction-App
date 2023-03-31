const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Feature_payment_Schema = new Mongoose.Schema({
    seller_id:{
        type: Number,
        required: true,
    },
    auction_id: {
        type: Number,
        required: true,
    },
    assign_feature_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'assign_feature',
        required: true,
    },
    payment_amount:{
        type: Number,
        required: true,
    },
    status: {
        type: Number, 
        required: true,
    }
});

//below line will automatically generate createdAt & updatedAt fields
Feature_payment_Schema.set('timestamps', true);

module.exports.feature_payment = Mongoose.model("feature_payment", Feature_payment_Schema);