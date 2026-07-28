const mongoose = require("mongoose");

// const allocationSchema = new mongoose.Schema({
//   invoice: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Invoice",
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
// });

const paymentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "transfer", "check"],
    },
    note: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

paymentSchema.index({ customerId: 1, createdAt: -1 });

module.exports = mongoose.model("Payment", paymentSchema);
