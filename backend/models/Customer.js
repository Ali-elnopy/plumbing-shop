const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["plumber", "regular"],
      default: "regular",
      required: true,
      index: true,
    },
    totalDebt: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPurchases: {
      type: Number,
      default: 0,
      min: 0,
    },
    // notes: {
    //   type: String,
    //   default: "",
    // },
    lastVisit: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

customerSchema.index({ name: "text", phone: "text" });

module.exports = mongoose.model("Customer", customerSchema);
