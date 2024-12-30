const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productnumber: { type: String, required: true },
    productname: { type: String, required: true },
    dealerprice: { type: Number, required: true },
    profitrate: { type: Number, required: true },
    sellingprice: { type: Number, required: true }, // Automatically calculated
    collecteddate: { type: Date, required: true }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
