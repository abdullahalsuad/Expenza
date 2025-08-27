"use client";

import React, { useState } from "react";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseChart from "./ExpenseChart";
import RecentExpenses from "./RecentExpenses";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import Link from "next/link";

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

const Home = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <Link
            href="/add-expense"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Add Expense
          </Link>
        </div>

        <ExpenseSummary expenses={expenses} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseChart expenses={expenses} />
          <RecentExpenses expenses={expenses.slice(0, 5)} />
        </div>
      </div>
    </>
  );
};

export default Home;
