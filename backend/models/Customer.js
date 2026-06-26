const mongoose = require('mongoose')

const customerSchema = new mongooose.Schema(
    {
        name: {
            type: String,
            required: [true, 'اسم العميل مطلوب'],
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
            default: '',
        },
        type: {
            type: String,
            enum: ['plumber', 'regular'],
            default: 'regular',
        },
        totalDebt: {
            type: Number,
            default: 0,
        },
        notes: {
            type: String,
            default: '',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Customer', customerSchema);