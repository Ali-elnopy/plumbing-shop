const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: true,
  },
);

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [invoiceItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Invoice must contain at least one item",
      },
    },
    paymentType: {
      type: String,
      enum: ["cash", "deferred"],
      required: true,
      index: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    remainingAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "partial", "unpaid"],
      default: "unpaid",
      index: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

invoiceItemSchema.index({ customerId: 1, createdAt: -1 });
invoiceItemSchema.index({ status: 1, createdAt: -1 });
invoiceItemSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Invoice", invoiceSchema);
