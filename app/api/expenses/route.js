import { expensesModel } from "@/models/expensesModel";
import { dbConnect } from "@/service/mongo";

// API route to handle fetching all expense entries
export async function GET() {
  // Establish a connection with the database
  await dbConnect();

  // Retrieve all expenses from the database
  const expenses = await expensesModel.find({});

  // Return the expenses as JSON with HTTP status 200 (OK)
  return new Response(JSON.stringify(expenses), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// API route to handle creating a new expense entry
export async function POST(request) {
  // Establish a connection with the database
  await dbConnect();

  // Parse request body, create expense document, and save to DB
  const body = await request.json();
  const expense = new expensesModel(body);
  const savedExpense = await expense.save();

  // Return the saved expense as JSON with HTTP status 201 (Created)
  return new Response(JSON.stringify(savedExpense), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

// API route to handle deleting an expense by ID
export async function DELETE(request) {
  try {
    // Establish a connection with the database
    await dbConnect();

    // Extract expense ID from request body
    const { id } = await request.json();

    // Validate required ID
    if (!id) {
      return new Response(JSON.stringify({ error: "Expense ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the expense by ID
    await expensesModel.findByIdAndDelete(id);

    // Return success response
    return new Response(JSON.stringify({ message: "Expense deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle unexpected errors
    return new Response(JSON.stringify({ error: "Failed to delete expense" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// API route to handle updating an expense
export async function PUT(request) {
  try {
    // Establish a connection with the database
    await dbConnect();

    // Extract fields from request body
    const { id, amount, category, date, description } = await request.json();

    // Validate required ID
    if (!id) {
      return new Response(JSON.stringify({ error: "Expense ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find expense by ID and update with new values
    const updatedExpense = await expensesModel.findByIdAndUpdate(
      id,
      { amount, category, date, description },
      { new: true, runValidators: true }
    );

    // Handle case when expense is not found
    if (!updatedExpense) {
      return new Response(JSON.stringify({ error: "Expense not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the updated expense
    return new Response(JSON.stringify(updatedExpense), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle unexpected errors
    return new Response(JSON.stringify({ error: "Failed to update expense" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
