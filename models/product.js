const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

var productSchema = mongoose.Schema({
    name:{
        type : String,
        required: true,
        trim : true,
        maxLength: 32,
    },
    description:{
        type : String,
        required: true,
        trim : true,
        maxLength: 2000,
    },
    price:{
        type: Number,
        trim: true,
        required: true,
    },
    category:{
        type: ObjectId,
        ref: "Category",
        required: true,
    },
    stock:{
        type: Number    //to check how many items is there in the stock
    },
    sold:{
        type: Number,
        default : 0
    },
    photo:{
        type: Buffer,
        contentType : String,
    }
},{timestamps:true});

module.exports = mongoose.model("Product", productSchema);