interface ExpenseProgressItemProps {
  category: string;
  amount: number;
  percentage: number;
  colorClass: string;
}

const ExpenseProgressItem = ({
  category,
  amount,
  percentage,
  colorClass,
}: ExpenseProgressItemProps) => {
  return (
    <div key={category} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{category}</span>
        <span className="text-sm font-semibold text-foreground">
          ${(amount as number).toFixed(2)}
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
};

export default ExpenseProgressItem;
