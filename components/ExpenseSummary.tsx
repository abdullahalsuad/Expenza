import { Calendar1 } from "lucide-react";
import { ChartLine } from "lucide-react";
import { CreditCard } from "lucide-react";
import React from "react";

interface Expense {
  amount: number;
  date: string;
  category: string;
}

const ExpenseSummary = ({ expenses = [] }: { expenses: Expense[] }) => {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Calculate total expenses for the current month
  const monthlyExpenses = expenses
    .filter((e) => {
      const date = new Date(e.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    })
    .reduce((sum, e) => sum + e.amount, 0);

  // Aggregate expenses by category
  const categories: Record<string, number> = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  // Determine the top spending category
  const topCategory = Object.entries(categories).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  )[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Expenses */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              Total Expenses
            </p>
            <p className="text-3xl font-bold text-foreground">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>
          <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl">
              <CreditCard />
            </span>
          </div>
        </div>
      </div>

      {/* This Month */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              This Month
            </p>
            <p className="text-3xl font-bold text-foreground">
              ${monthlyExpenses.toFixed(2)}
            </p>
          </div>
          <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl">
              <Calendar1 />
            </span>
          </div>
        </div>
      </div>

      {/* Top Category */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              Top Category
            </p>
            <p className="text-xl font-bold text-foreground">
              {topCategory?.[0] || "None"}
            </p>
            <p className="text-sm text-muted-foreground">
              ${((topCategory?.[1] as number) || 0).toFixed(2)}
            </p>
          </div>
          <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl">
              <ChartLine />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
