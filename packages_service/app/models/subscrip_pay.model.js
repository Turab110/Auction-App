const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Subscrip_payment_Schema = new Mongoose.Schema({
    seller_id:{
        type: Number,
        required: true,
    },
    assign_subscrip_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'assign_subscription',
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
Subscrip_payment_Schema.set('timestamps', true);

module.exports.subscrip_payment = Mongoose.model("subscrip_payment", Subscrip_payment_Schema);