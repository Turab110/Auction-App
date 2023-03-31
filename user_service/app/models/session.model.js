const Mongoose = require("mongoose")

/**
 * InternalUser Session Schema
 */
 const SessionSchema = new Mongoose.Schema({
    user_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    token: {
        type: String,
    },
    blacklist: {
        type: Number, 
        default: 0,
    },
});

//below line will automatically generate createdAt & updatedAt fields
SessionSchema.set('timestamps', true);

module.exports.session = Mongoose.model("session", SessionSchema);
