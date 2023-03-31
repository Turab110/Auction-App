const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const SubCategorySchema = new Mongoose.Schema({
    sub_cat_name:{
        type: String,
        required: true,
        lowercase: true,
    },
    main_cat_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'main_category',
        required: true
    },
    status: {
        type: Number, 
        required: true,
    },
});

//below line will automatically generate createdAt & updatedAt fields
SubCategorySchema.set('timestamps', true);

module.exports.sub_category = Mongoose.model("sub_category", SubCategorySchema);