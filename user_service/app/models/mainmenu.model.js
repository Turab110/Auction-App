const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const MainmenuSchema = new Mongoose.Schema({
    main_title:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    main_link:{
        type: String,
        lowercase: true,
    },
    main_seq:{
        type: Number,
        required: true,
    },
    status: {
        type: Number, 
        required: true,
    },
});

//below line will automatically generate createdAt & updatedAt fields
MainmenuSchema.set('timestamps', true);

module.exports.mainmenu = Mongoose.model("mainmenus", MainmenuSchema);