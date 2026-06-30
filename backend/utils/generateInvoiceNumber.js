const Invoice = require('../models/Invoice')

const generateInvoiceNumber = async ()=>{
    const year = new Date().getFullYear();
    const lastInvoice = await Invoice.findOne({
        invoiceNumber: {$regex: `^INV-${year}-`},
    }).sort({createdAt: -1})
    let nextNumber = 1
    if(lastInvoice){
        const lastNumber = parseInt(lastInvoice.invoiceNumber.split('-')[2])
        nextNumber = lastNumber + 1
    }
    const formattedNumber = String(nextNumber).padStart(3,'0')
    return `INV-${year}-${formattedNumber}`
}

module.exports = generateInvoiceNumber