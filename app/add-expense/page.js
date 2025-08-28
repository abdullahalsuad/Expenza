import { auth } from "@/auth";
import AddExpenseForm from "@/components/AddExpenseForm";
import { redirect } from "next/navigation";

const AddExpensePage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <AddExpenseForm />;
};

export default AddExpensePage;
