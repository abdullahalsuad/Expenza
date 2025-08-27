import ExpenseList from "@/components/expenses/ExpenseList";
import Link from "next/link";
import { dbConnect } from "@/service/mongo";
import { expensesModel } from "@/models/expensesModel";

export default async function AllExpensesPage() {
  // Connect to DB and fetch expenses
  await dbConnect();
  const expenses = await expensesModel.find({});

  // Convert MongoDB documents to plain JSON (required for passing to client)
  const plainExpenses = JSON.parse(JSON.stringify(expenses));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-foreground">All Expenses</h1>
        <Link
          href="/add-expense"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-center"
        >
          Add Expense
        </Link>
      </div>

      {/* Pass fetched expenses directly */}
      <ExpenseList expenses={plainExpenses} />
    </div>
  );
}
