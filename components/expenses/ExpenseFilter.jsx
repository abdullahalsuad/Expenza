"use client";

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
    <div className="bg-card p-4 rounded-xl border border-border">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Filter by Category
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
          >
            <option value="date">Date (Newest First)</option>
            <option value="amount">Amount (Highest First)</option>
            <option value="category">Category (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
