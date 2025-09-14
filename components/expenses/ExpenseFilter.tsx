"use client";

import { ChevronDown } from "lucide-react";

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

export default function ExpenseFilter({
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="bg-card p-4 rounded-xl border border-border dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2 dark:text-gray-300">
            Filter by Category
          </label>
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 pr-10 bg-input border border-border rounded-lg appearance-none
                         focus:ring-2 focus:ring-ring focus:border-transparent outline-none
                         dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none dark:text-gray-400" />
          </div>
        </div>

        {/* Sort */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2 dark:text-gray-300">
            Sort by
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 pr-10 bg-input border border-border rounded-lg appearance-none
                         focus:ring-2 focus:ring-ring focus:border-transparent outline-none
                         dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="date">Date (Newest First)</option>
              <option value="amount">Amount (Highest First)</option>
              <option value="category">Category (A-Z)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none dark:text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
