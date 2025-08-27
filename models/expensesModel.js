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
    enum: ["AI Tool", "Productivity", "Analytics", "Automation"], // Customize for your products
  },
  description: {
    type: String,
    required: True,
  },
});

export const expensesModel =
  mongoose.models.expenses ?? mongoose.model("expenses", expensesSchema);
