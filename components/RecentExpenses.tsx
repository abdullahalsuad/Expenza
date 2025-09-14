import { formatDate } from "@/utils/date";
import {
  Car,
  Clapperboard,
  GraduationCap,
  Package,
  ShoppingCart,
  Soup,
  SquareActivity,
  Zap,
} from "lucide-react";

const RecentExpenses = ({ expenses = [] }) => {
  // Return corresponding icon component for a given category
  const getCategoryIcon = (category) => {
    const icons = {
      Food: <Soup />,
      Transportation: <Car />,
      Entertainment: <Clapperboard />,
      Utilities: <Zap />,
      Shopping: <ShoppingCart />,
      Healthcare: <SquareActivity />,
      Education: <GraduationCap />,
      Other: <Package />,
    };
    return icons[category] || icons["Other"];
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border dark:bg-gray-900 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Recent Expenses
      </h3>

      <div className="space-y-4">
        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recent expenses</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense._id || expense.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className=" w-10 h-10 bg-gray-200 dark:bg-gray-500 rounded-lg flex items-center justify-center">
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
          ))
        )}
      </div>
    </div>
  );
};

export default RecentExpenses;
