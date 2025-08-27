const RecentExpenses = ({ expenses }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      Food: "🍽️",
      Transportation: "🚗",
      Entertainment: "�",
      Utilities: "⚡",
      Shopping: "🛍️",
      Healthcare: "🏥",
      Education: "📚",
      Other: "📦",
    };
    return icons[category] || icons["Other"];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Recent Expenses
      </h3>

      <div className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-lg">
                  {getCategoryIcon(expense.category)}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {expense.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {expense.category} • {formatDate(expense.date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">
                ${expense.amount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {expenses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No recent expenses</p>
        </div>
      )}
    </div>
  );
};

export default RecentExpenses;
