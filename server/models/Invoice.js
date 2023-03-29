import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    projectTitle: { type: String },
    projectProcess: { type: String },
    invoiceDescription: { type: String },
    invoiceTo: { type: String, required: true },
    invoicePrice: { type: Number, required: true },
    paymentType: { type: String },
    paymentBankacct: { type: String },
    invoicePriority: { type: String },
    invoiceStatus: { type: String },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
