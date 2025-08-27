const ExpenseSummary = ({ expenses }) => {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categories).sort(
    ([, a], [, b]) => b - a
  )[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <span className="text-2xl">💸</span>
          </div>
        </div>
      </div>

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
            <span className="text-2xl">📅</span>
          </div>
        </div>
      </div>

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
              ${topCategory?.[1]?.toFixed(2) || "0.00"}
            </p>
          </div>
          <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🏆</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
