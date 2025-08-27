"use client";

import { useState } from "react";

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
  return icons[category] || "📦";
};

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    description: expense.description,
  });

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

  const handleSave = () => {
    onEdit(expense._id, form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      description: expense.description,
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: parseFloat(e.target.value) || 0 })
            }
            className="px-3 py-2 bg-input border border-border rounded-lg outline-none"
            step="0.01"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="px-3 py-2 bg-input border border-border rounded-lg outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="px-3 py-2 bg-input border border-border rounded-lg outline-none"
          />
        </div>
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 bg-input border border-border rounded-lg outline-none"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-border rounded hover:bg-muted"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-xl">{getCategoryIcon(expense.category)}</span>
        </div>
        <div>
          <h4 className="font-medium text-foreground">{expense.description}</h4>
          <p className="text-sm text-muted-foreground">
            {expense.category} • {new Date(expense.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xl font-semibold text-foreground">
          ${expense.amount.toFixed(2)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(expense._id)}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
