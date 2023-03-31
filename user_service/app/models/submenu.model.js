const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const SubmenuSchema = new Mongoose.Schema({
    sub_title:{
        type: String,
        required: true,
        lowercase: true,
    },
    main_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'mainmenus',
        required: true
    },
    sub_link:{
        type: String,
        lowercase: true,
        required: true
    },
    sub_seq:{
        type: Number,
        required: true
    },
    status: {
        type: Number, 
        required: true,
    },
});

//below line will automatically generate createdAt & updatedAt fields
SubmenuSchema.set('timestamps', true);

module.exports.submenu = Mongoose.model("submenus", SubmenuSchema);