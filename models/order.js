const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

var productCartSchema = mongoose.Schema({
    product:{
        type: ObjectId,
        ref : "Product"
    },
    name: String,
    count: Number,
    price: Number,
});

const ProductCart = mongoose.model("ProductCart", productCartSchema);

var orderSchema = mongoose.Schema({
    products: [productCartSchema],
    transaction_id : {},
    amount : {type: Number},
    address : String,
    updated: Date,
    user:{
        type: ObjectId,
        ref: "User"
    }
},{timestamps:true});

const Order = mongoose.model("Order", orderSchema);

module.exports = {Order, ProductCart};