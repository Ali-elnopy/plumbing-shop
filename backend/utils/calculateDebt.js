const Invoice = require('../models/Invoice')

// FIFO بتوزع مبلغ معين على فواتير العميل بنظام 
const allocatePayment = async (customerId, totalAmount)=>{
    // نجيب كل الفواتير اللي لسه مدفوعة بالكامل، الأقدم الأول
    const unpaidInvoices = await Invoice.find({
        customer: customerId,
        status: {$in: ['unpaid', 'paid']},
    }).sort({createdAt: 1}) //1 = الأقدم الأول (FIFO)

    let remainingAmount = totalAmount
    const allocations = []

    for(const invoice of unpaidInvoices){
        if(remainingAmount <= 0) break;

        const invoiceRemaining = invoice.totalAmount -invoice.paidAmount
        const amountToApply = Math.min(remainingAmount, invoiceRemaining)

        allocations.push({
            invoice: invoice.id,
            amount: amountToApply,
        })

        invoice.paidAmount += amountToApply
        invoice.remainingAmount = invoice.totalAmount - invoice.paidAmount
        invoice.status = invoice.remainingAmount === 0 ? 'paid' : 'partial'

        await invoice.save();

        remainingAmount -= amountToApply;
    }
    return {
    allocations,
    unallocatedAmount: remainingAmount,
    };
}
module.exports = allocatePayment;