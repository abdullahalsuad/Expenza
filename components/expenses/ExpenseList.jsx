"use client";

import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";


const ExpenseList = ({ expenses: initialExpenses }) => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const handleDelete = async (id) => {
    if (!confirm("Delete this expense?")) return;

    const res = await fetch("/api/expenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    }
  };

  const handleEdit = async (id, updatedData) => {
    const res = await fetch("/api/expenses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updatedData }),
    });

    if (res.ok) {
      const updated = await res.json();
      setExpenses((prev) => prev.map((e) => (e._id === id ? updated : e)));
    }
  };

  const filteredExpenses = expenses
    .filter((e) => !filterCategory || e.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "category") return a.category.localeCompare(b.category);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div className="space-y-6">
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
