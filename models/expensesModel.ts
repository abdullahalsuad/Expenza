import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface for the expense document
export interface IExpense extends Document {
  amount: number;
  date: string;
  category: "Food" | "Transportation" | "Entertainment" | "Utilities" | "Shopping" | "Healthcare" | "Education" | "Other";
  description: string;
}

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

export const expensesModel: Model<IExpense> =
  mongoose.models.expenses ?? mongoose.model<IExpense>("expenses", expensesSchema);
