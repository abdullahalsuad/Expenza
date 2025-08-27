"use client";

import React, { useState } from "react";

const AddExpenseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    onSubmit({
      amount: Number.parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      description: formData.description,
    });

    // Reset form
    setFormData({
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-card p-8 rounded-xl border border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Amount *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full pl-8 pr-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-colors"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-colors"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-colors resize-none"
            placeholder="Enter expense description..."
            required
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Add Expense
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData({
                amount: "",
                category: "",
                date: new Date().toISOString().split("T")[0],
                description: "",
              })
            }
            className="px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
