import { getMonthlyExpenses, topCategoryExpenses } from "@/utils/expenses";
import { Calendar1 } from "lucide-react";
import { ChartLine } from "lucide-react";
import { CreditCard } from "lucide-react";
import React from "react";
import StatsCard from "./StatsCard";

interface Expense {
  amount: number;
  date: string;
  category: string;
}

const ExpenseSummary = ({ expenses = [] }: { expenses: Expense[] }) => {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Calculate total expenses for the current month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = getMonthlyExpenses(
    expenses,
    currentMonth,
    currentYear
  );

  // top category
  const topCategory = topCategoryExpenses(expenses);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Total Expenses"
        value={`$${totalExpenses.toFixed(2)}`}
        icon={<CreditCard />}
        iconBgColor="bg-chart-1/10"
      />

      <StatsCard
        title="This Month"
        value={`$${monthlyExpenses.toFixed(2)}`}
        icon={<Calendar1 />}
        iconBgColor="bg-chart-2/10"
      />

      <StatsCard
        title="Top Category"
        value={topCategory?.[0] || "None"}
        subValue={`$${((topCategory?.[1] as number) || 0).toFixed(2)}`}
        icon={<ChartLine />}
        iconBgColor="bg-chart-3/10"
      />
    </div>
  );
};

export default ExpenseSummary;
