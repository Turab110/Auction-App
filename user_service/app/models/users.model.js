const Mongoose = require("mongoose")
/**
 * InternalUser Schema
 */
const UserSchema = new Mongoose.Schema({
    role_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'roles'
    },
    username:{
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        unique: true, 
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
    },
    verify_code: {
        type: String,
    },
    phoneNo: {
        type: String,
        unique: true,
        maxLength: 15,
    },
    profile_image: {
        type: String,
    },
    is_verified: {
        type: Number,
        default:0 
    },
    is_registered: {
        type: Number,
        default:0
    },
    status: {
        type: Number, 
        default:0
    },
});

//below line will automatically generate createdAt & updatedAt fields
UserSchema.set('timestamps', true);

module.exports.user = Mongoose.model("user", UserSchema);