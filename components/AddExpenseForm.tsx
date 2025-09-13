"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function AddExpenseForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.amount || !formData.category || !formData.description) {
      toast.warning("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send data to API
      const res = await fetch("/api/expenses", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.refresh(); // Refresh data on page
        toast.success("Expense has been added");

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
    } catch (error) {
      toast.error("Failed to add expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="lg:w-8/12 mx-auto p-8 rounded-xl border border-border">
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
            rows={3}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none resize-none"
            placeholder="Enter description..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting} // Disable while submitting
            className={`flex-1 py-3 rounded-lg font-medium text-white 
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 cursor-pointer"
              }`}
          >
            {isSubmitting ? "Adding..." : "Add Expense"} {/* Loading text */}
          </button>
        </div>
      </form>
    </div>
  );
}
