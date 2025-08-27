"use client";

import React, { useState } from "react";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: 0,
    category: "",
    date: "",
    description: "",
  });
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Shopping",
    "Healthcare",
    "Education",
    "Other",
  ];

  const getCategoryIcon = (category) => {
    const icons = {
      Food: "🍽️",
      Transportation: "🚗",
      Entertainment: "🎬",
      Utilities: "⚡",
      Shopping: "🛍️",
      Healthcare: "🏥",
      Education: "📚",
      Other: "📦",
    };
    return icons[category] || icons["Other"];
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      description: expense.description,
    });
  };

  const handleSaveEdit = () => {
    if (editingId) {
      onEdit(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ amount: 0, category: "", date: "", description: "" });
  };

  // Filter and sort expenses
  const filteredAndSortedExpenses = expenses
    .filter((expense) => !filterCategory || expense.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return b.amount - a.amount;
        case "category":
          return a.category.localeCompare(b.category);
        case "date":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <div className="bg-card p-4 rounded-xl border border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="filter"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Filter by Category
            </label>
            <select
              id="filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Sort by
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
            >
              <option value="date">Date (Newest First)</option>
              <option value="amount">Amount (Highest First)</option>
              <option value="category">Category (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {filteredAndSortedExpenses.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No expenses found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredAndSortedExpenses.map((expense) => (
              <div key={expense.id} className="p-4">
                {editingId === expense.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Amount
                        </label>
                        <input
                          type="number"
                          value={editForm.amount}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              amount: Number.parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Category
                        </label>
                        <select
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={editForm.date}
                          onChange={(e) =>
                            setEditForm({ ...editForm, date: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-xl">
                          {getCategoryIcon(expense.category)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">
                          {expense.description}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {expense.category} •{" "}
                          {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-semibold text-foreground">
                        ${expense.amount.toFixed(2)}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                          title="Edit expense"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDelete(expense.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Delete expense"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
