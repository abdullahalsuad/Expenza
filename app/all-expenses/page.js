"use client";

import ExpenseList from "@/components/ExpenseList";
import Link from "next/link";
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

const AllExpensesPage = () => {
  const [expenses, setExpenses] = useState(initialExpenses);

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...updatedExpense, id } : expense
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-foreground">All Expenses</h1>
        <Link
          href="/add-expense"
          onClick={() => setActiveView("add")}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Add Expense
        </Link>
      </div>
      <ExpenseList
        expenses={expenses}
        onDelete={deleteExpense}
        onEdit={editExpense}
      />
    </div>
  );
};

export default AllExpensesPage;
