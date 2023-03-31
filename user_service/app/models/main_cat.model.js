const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const CategorySchema = new Mongoose.Schema({
    main_cat_name:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    main_cat_image:{
        type: String,
    },
    status: {
        type: Number, 
        required: true
    },
});

//below line will automatically generate createdAt & updatedAt fields
CategorySchema.set('timestamps', true);

module.exports.main_category = Mongoose.model("main_category", CategorySchema);