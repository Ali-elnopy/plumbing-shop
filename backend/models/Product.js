const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'اسم المنتج مطلوب'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'الفئة مطلوبة'],
            trim: true,
        },
        unit: {
            type: String,
            enum: ['piece', 'meter', 'kg', 'box'],
            default: 'piece',
        },
        purchasePrice: {
            type: Number,
            required: [true, 'سعر الشراء مطلوب'],
            min: 0,
        },
        purchasePrice: {
            type: Number,
            required: [true, 'سعر الشراء مطلوب'],
            min: 0,
        },
        sellingPrice: {
            type: Number,
            required: [true, 'سعر البيع مطلوب'],
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        minQuantity: {
            type: Number,
            default: 5,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

productSchema.virtual('isLowStock').get(function (){
    return this.quantity <= this.minQuantity;
})

module.exports = mongoose.model('Product',productSchema);