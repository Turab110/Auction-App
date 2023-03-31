const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Assign_subscrip_Schema = new Mongoose.Schema({
    seller_id:{
        type: Number,
        required: true,
    },
    subs_pack_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'subscription_package',  
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
    no_of_auction: {
        type: Number, 
        required: true,
    },
    is_expired: {
        type: Number, 
        required: true,
    },
    is_completed: {
        type: Number, 
        required: true,
    },
    status: {
        type: Number, 
        required: true,
    },
});

//below line will automatically generate createdAt & updatedAt fields
Assign_subscrip_Schema.set('timestamps', true);

module.exports.assign_subscription = Mongoose.model("assign_subscription", Assign_subscrip_Schema);