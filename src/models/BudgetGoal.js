import mongoose from "mongoose";

const BudgetGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  limit: {
    type: Number,
    required: true,
  },

  month: {
    type: Number,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },
});

const BudgetGoal =
  mongoose.models.BudgetGoal || mongoose.model("BudgetGoal", BudgetGoalSchema);

export default BudgetGoal;
