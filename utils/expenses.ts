//expense type
export interface Expense {
  date: string | Date;
  amount: number;
  category: string;
}

export function getMonthlyExpenses(
  expenses: Expense[],
  month: number,
  year: number
): number {
  return expenses.reduce((sum, { date, amount }) => {
    const d = new Date(date);
    return d.getMonth() === month && d.getFullYear() === year
      ? sum + amount
      : sum;
  }, 0);
}

export function topCategoryExpenses(expenses: Expense[]) {
  // Aggregate expenses by category
  const categories: Record<string, number> = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  // Determine the top spending category
  const topCategory = Object.entries(categories).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  )[0];

  return topCategory;
}
