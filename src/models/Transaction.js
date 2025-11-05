import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
});

const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;
