"use client";

import { useState } from "react";
import EditForm from "./EditForm";
import { SquarePen } from "lucide-react";
import { Trash } from "lucide-react";
import { Soup } from "lucide-react";
import { Car } from "lucide-react";
import { Package } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { SquareActivity } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Zap } from "lucide-react";
import { Clapperboard } from "lucide-react";

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
  return icons[category] || <Package />;
};

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    description: expense.description,
  });

  const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Shopping",
    "Healthcare",
    "Education",
    "Other",
  ];

  const handleSave = () => {
    onEdit(expense._id, form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      description: expense.description,
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <EditForm
        form={form}
        setForm={setForm}
        categories={categories}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-xl">{getCategoryIcon(expense.category)}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-foreground truncate">
            {expense.description}
          </h4>
          <p className="text-sm text-muted-foreground truncate">
            {expense.category} • {new Date(expense.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:justify-normal">
        <span className="text-xl font-semibold text-foreground whitespace-nowrap">
          ${expense.amount.toFixed(2)}
        </span>
        <div className="flex gap-2 ml-auto sm:ml-0">
          <button
            onClick={() => setEditing(true)}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg cursor-pointer transition-colors"
            aria-label="Edit expense"
          >
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => onDelete(expense._id)}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer transition-colors"
            aria-label="Delete expense"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
