"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ExpenseChart from "./home/ExpenseChart";
import RecentExpenses from "./RecentExpenses";
import Loading from "./loading/Loading";
import ExpenseSummary from "./home/ExpenseSummary";

interface Expense {
  amount: number;
  date: string;
  category: string;
  description: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("/api/expenses");
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        // Sort newest first
        const sorted = data.sort(
          (a: Expense, b: Expense) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setExpenses(sorted);
      } catch (err) {
        console.error("Fetch error:", err);
        // Optionally show toast or keep empty state
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <Link
          href="/add-expense"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-center"
        >
          Add Expense
        </Link>
      </div>

      {/* Summary */}
      <ExpenseSummary expenses={expenses} />

      {/* Charts & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ExpenseChart expenses={expenses} />
        <RecentExpenses expenses={expenses.slice(0, 5)} />
      </div>
    </div>
  );
}
