const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const RolesSchema = new Mongoose.Schema({
    role_name:{
        type: String,
        required: true,
        lowercase: true,
    },
    status: {
        type: Number,
        required: true 
    },
});

//below line will automatically generate createdAt & updatedAt fields
RolesSchema.set('timestamps', true);

module.exports.roles = Mongoose.model("roles", RolesSchema);