import React from "react";

const ExpenseChart = ({ expenses = [] }) => {
  // Aggregate expenses by category
  const categoryData = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  // Convert to array and sort categories by total amount (desc)
  const categories = Object.entries(categoryData).sort(([, a], [, b]) => b - a);

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
    <div className="bg-card p-6 rounded-xl border border-border">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Expenses by Category
      </h3>

      <div className="space-y-4">
        {categories.map(([category, amount], index) => {
          const percentage = (amount / maxAmount) * 100;
          const colorClass = colors[index % colors.length];
          return (
            <div key={category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">
                  {category}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  ${amount.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${colorClass}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
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
