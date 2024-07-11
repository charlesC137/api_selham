const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  rating: {
    stars: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  priceCents: { type: Number, required: true },
  keywords: [{ type: String, required: true }],
  filters: [{ type: String, required: true }],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
