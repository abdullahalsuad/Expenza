"use client";

import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";
import { Toaster, toast } from "sonner";

const ExpenseList = ({ expenses: initialExpenses }) => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Delete an expense by ID and update local state
  const handleDelete = async (id) => {
    if (!confirm("Delete this expense?")) return;

    const res = await fetch("/api/expenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      // Remove deleted expense from state
      toast.success("Expense successfully deleted");
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    }
  };

  // Edit an expense by ID, send update request, and update local state
  const handleEdit = async (id, updatedData) => {
    const res = await fetch("/api/expenses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updatedData }),
    });

    if (res.ok) {
      const updated = await res.json();
      // Replace old expense with updated one
      toast.success("Expense successfully  updated");
      setExpenses((prev) => prev.map((e) => (e._id === id ? updated : e)));
    }
  };

  // Filter and sort expenses by category, amount, or date
  const filteredExpenses = expenses
    .filter((e) => !filterCategory || e.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount; // Sort by amount (desc)
      if (sortBy === "category") return a.category.localeCompare(b.category); // Sort alphabetically by category
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Sort by latest date
    });

  return (
    <div className="space-y-6">
      {/* toast */}
      <Toaster position="top-right" expand={true} richColors />
      <ExpenseFilter
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {filteredExpenses.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No expenses found</p>
          </div>
        ) : (
          filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense._id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
