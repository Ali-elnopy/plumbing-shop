const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    unit: {
      type: String,
      enum: ["piece", "meter", "kg", "box"], //"kg", "box"
      default: "piece",
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    minStock: {
      type: Number,
      default: 5,
      min: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

productSchema.index({ name: "text", category: "text" });

productSchema.virtual("isLowStock").get(() => {
  return this.stock <= this.minStock;
});

module.exports = mongoose.model("Product", productSchema);
