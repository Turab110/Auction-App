const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Feature_pack_Schema = new Mongoose.Schema({
    feature_name:{
        type: String,
        required: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
    },
    days_limit:{
        type: Number,
        required: true,
    },
    status: {
        type: Number, 
        required: true,
    },
});

//below line will automatically generate createdAt & updatedAt fields
Feature_pack_Schema.set('timestamps', true);

module.exports.feature_package = Mongoose.model("feature_package", Feature_pack_Schema);