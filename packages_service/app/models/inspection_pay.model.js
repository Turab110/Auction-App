const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Inspection_payment_Schema = new Mongoose.Schema({
    buyer_id:{
        type: Number,
        required: true,
    },
    inspection_id: {
        type: Number,
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
Inspection_payment_Schema.set('timestamps', true);

module.exports.inspection_payment = Mongoose.model("inspection_payment", Inspection_payment_Schema);