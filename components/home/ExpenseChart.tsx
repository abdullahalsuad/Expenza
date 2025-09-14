import React from "react";
import ExpenseProgressItem from "./ExpenseProgressItem";

interface Expense {
  category: string;
  amount: number;
}

const ExpenseChart = ({ expenses = [] }: { expenses: Expense[] }) => {
  // Aggregate expenses by category
  const categoryData: Record<string, number> = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array and sort categories by total amount (desc)
  const categories = Object.entries(categoryData).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  );

  // Find the maximum category amount (used for charts/scaling)
  const maxAmount = Math.max(...Object.values(categoryData), 1);

  const colors = [
    "bg-chart-1",
    "bg-chart-2",
    "bg-chart-3",
    "bg-chart-4",
    "bg-chart-5",
  ];

  return (
    <div className="bg-card p-6 rounded-xl border border-border dark:bg-gray-900 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Expenses by Category
      </h3>

      <div className="space-y-4">
        {categories.map(([category, amount], index) => {
          const percentage = ((amount as number) / maxAmount) * 100;
          const colorClass = colors[index % colors.length];
          return (
            <ExpenseProgressItem
              key={category}
              category={category}
              amount={amount as number}
              percentage={percentage}
              colorClass={colorClass}
            />
          );
        })}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No expenses to display</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
