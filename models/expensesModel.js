import mongoose, { Schema } from "mongoose";

const expensesSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Food",
      "Transportation",
      "Entertainment",
      "Utilities",
      "Shopping",
      "Healthcare",
      "Education",
      "Other",
    ],
  },
  description: {
    type: String,
    required: true,
  },
});

export const expensesModel =
  mongoose.models.expenses ?? mongoose.model("expenses", expensesSchema);
