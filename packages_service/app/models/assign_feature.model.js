const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Assign_feature_Schema = new Mongoose.Schema({
    seller_id:{
        type: Number,
        required: true,
    },
    auction_id: {
        type: Number,
        required: true,
    },
    feat_pack_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'feature_package',  
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date:{
        type: Date,
        required: true,
    },
    expire: {
        type: Number, 
        required: true,
    },
    status: {
        type: Number, 
        required: true,
    },
});

//below line will automatically generate createdAt & updatedAt fields
Assign_feature_Schema.set('timestamps', true);

module.exports.assign_feature = Mongoose.model("assign_feature", Assign_feature_Schema);