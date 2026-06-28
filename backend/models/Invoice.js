const mongoose = require('mongoose')

const invoiceItemSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required: true,
    },
    productName:{
        type:String,
        required:true,
    },
    quantity:{
        type: Number,
        required:true,
        min:1,
    },
    unitPrice:{
        type:Number,
        required:true,
    },
    total:{
        type: Number,
        required:true,
    }
})

const invoiceSchema = new mongoose.Schema({
    invoiceNumber:{
        type: String,
        unique:true,
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        default:null,
    },
    cashier:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items:[invoiceItemSchema],
    totalAmount:{
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        enum: ['cash', 'deferred'],
        required: true,
    },
    paidAmount: {
        type: Number,
        default: 0,
    },
    remainingAmount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['paid', 'partial', 'unpaid'],
        default: 'unpaid',
    },
    notes: {
      type: String,
      default: '',
    },
},
{ timestamps: true }
)

module.exports = mongoose.model('Invoice', invoiceSchema);
