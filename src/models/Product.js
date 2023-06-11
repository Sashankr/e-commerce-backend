const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, unique: true },
    img: { type: String, required: true, unique: true },
    categories: { type: String, required: true, unique: true },
    size: { type: String, required: true, unique: true },
    color: { type: String, required: true, unique: true },
    price: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
