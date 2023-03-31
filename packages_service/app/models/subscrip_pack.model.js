const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Subscrip_pack_Schema = new Mongoose.Schema({
    subs_pack_name:{
        type: String,
        required: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
    },
    auctions_limit:{
        type: Number,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    status: {
        type: Number, 
        required: true,
    },
});

//below line will automatically generate createdAt & updatedAt fields
Subscrip_pack_Schema.set('timestamps', true);

module.exports.subscription_package = Mongoose.model("subscription_package", Subscrip_pack_Schema);