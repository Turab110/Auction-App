const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const RolePermissionSchema = new Mongoose.Schema({
    role_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'roles',
        required: true
    },
    main_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'mainmenus',
        required: true
    },
    sub_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'submenus'
    },
    status: {
        type: Number, 
        required: true
    },
});

//below line will automatically generate createdAt & updatedAt fields
RolePermissionSchema.set('timestamps', true);

module.exports.role_permission = Mongoose.model("role_permission", RolePermissionSchema);