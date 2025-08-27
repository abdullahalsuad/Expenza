"use client";

import AddExpenseForm from "@/components/AddExpenseForm";
import React, { useState } from "react";

const initialExpenses = [
  {
    id: "1",
    amount: 45.99,
    category: "Food",
    date: "2024-01-15",
    description: "Grocery shopping",
  },
  {
    id: "2",
    amount: 120.0,
    category: "Transportation",
    date: "2024-01-14",
    description: "Gas fill-up",
  },
  {
    id: "3",
    amount: 25.5,
    category: "Entertainment",
    date: "2024-01-13",
    description: "Movie tickets",
  },
  {
    id: "4",
    amount: 89.99,
    category: "Utilities",
    date: "2024-01-12",
    description: "Internet bill",
  },
  {
    id: "5",
    amount: 15.75,
    category: "Food",
    date: "2024-01-11",
    description: "Coffee shop",
  },
];

const AddExpensePage = () => {
  const [expenses, setExpenses] = useState(initialExpenses);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
    setActiveView("dashboard");
  };

  return (
    <>
      <AddExpenseForm onSubmit={addExpense} />
    </>
  );
};

export default AddExpensePage;
