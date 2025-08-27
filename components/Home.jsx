"use client";

import React, { useState } from "react";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseChart from "./ExpenseChart";
import RecentExpenses from "./RecentExpenses";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";

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

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
    setActiveView("dashboard");
  };

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
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {activeView === "dashboard" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <button
                onClick={() => setActiveView("add")}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Add Expense
              </button>
            </div>

            <ExpenseSummary expenses={expenses} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ExpenseChart expenses={expenses} />
              <RecentExpenses expenses={expenses.slice(0, 5)} />
            </div>
          </div>
        )}

        {activeView === "add" && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setActiveView("dashboard")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-foreground">
                Add Expense
              </h1>
            </div>
            <AddExpenseForm onSubmit={addExpense} />
          </div>
        )}

        {activeView === "list" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                All Expenses
              </h1>
              <button
                onClick={() => setActiveView("add")}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Add Expense
              </button>
            </div>
            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense}
              onEdit={editExpense}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
