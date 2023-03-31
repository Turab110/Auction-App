const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const IncpectionSchema = new Mongoose.Schema({
    auction_id: {
        type: String,
        required: true
    },
    product_reviews:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    incpection_report:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    status: {
        type: Number, 
        required: true,
    },
});

//below line will generate createdAt & updatedAt fields
IncpectionSchema.set('timestamps', true);

module.exports.incpection = Mongoose.model("incpection", IncpectionSchema);