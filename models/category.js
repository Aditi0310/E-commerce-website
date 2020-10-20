const mongoose = require('mongoose');

var catergorySchema = mongoose.Schema(
{
    name:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxLength: 32,
    }
},

{
    timestamps: true,
});

module.exports = mongoose.model("Category",catergorySchema);