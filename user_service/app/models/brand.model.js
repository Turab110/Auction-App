const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const BrandSchema = new Mongoose.Schema({
    brand_name:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    brand_description: {
        type: String,
        required: true,
    },
    logo:{
        type: String,
    },
    status: {
        type: Number, 
        required: true,
    },
});

//below line will automatically generate createdAt & updatedAt fields
BrandSchema.set('timestamps', true);

module.exports.brand = Mongoose.model("brand", BrandSchema);