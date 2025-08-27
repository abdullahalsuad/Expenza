"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";

// ...

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast("My first toast")}>Give me a toast</button>
    </div>
  );
}

export default function AddExpenseForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic check
    if (!formData.amount || !formData.category || !formData.description) {
      toast.warning("Please fill all required fields");
      return;
    }

    // Send to API
    const res = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const saved = await res.json();
      toast.success("Expense has been added");
      console.log("Expense added:", saved);

      // Reset form
      setFormData({
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });
    } else {
      toast.error("Failed to add expense");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-8/12 mx-auto p-8 rounded-xl border border-border">
      {/* toast */}
      <Toaster position="top-right" expand={true} richColors />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Amount *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full pl-8 pr-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none resize-none"
            placeholder="Enter description..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}
