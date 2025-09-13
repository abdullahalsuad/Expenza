import { Soup } from "lucide-react";
import { Car } from "lucide-react";
import { Package } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { SquareActivity } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Zap } from "lucide-react";
import { Clapperboard } from "lucide-react";

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

  // Format a date string as "Mon DD" (e.g., "Aug 28")
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border">
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
