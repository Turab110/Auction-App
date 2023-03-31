const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const Chat_message_Schema = new Mongoose.Schema({
    chat_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'auction_chatroom',  
        required: true
    },
    sender_id: {
        type: Number,
        required: true
    },
    receiver_id: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    time: {
        type: String, 
        required: true
    },
    status: {
        type: Number, 
        required: true
    },
});

//below line will automatically generate createdAt & updatedAt fields
Chat_message_Schema.set('timestamps', true);

module.exports.chat_message = Mongoose.model("chat_message", Chat_message_Schema);