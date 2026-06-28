const mongoose = require('mongoose');

const allocationSchema = new mongoose.Schema({
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
})

const paymentSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    totalPaid: {
        type: Number,
        required: true,
        min: 1,
    },
    allocations: [allocationSchema],
    cashier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    notes: {
        type: String,
        default: '',
    },

},
{ timestamps: true }
)

module.exports = mongoose.model('Payment', paymentSchema);