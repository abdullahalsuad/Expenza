import React from "react";

const EditForm = ({ form, setForm, categories, onSave, onCancel }) => {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="number"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: parseFloat(e.target.value) || 0 })
          }
          className="px-3 py-2 bg-input border border-border rounded-lg outline-none"
          step="0.01"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="px-3 py-2 bg-input border border-border rounded-lg outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="px-3 py-2 bg-input border border-border rounded-lg outline-none"
        />
      </div>
      <input
        type="text"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full px-3 py-2 bg-input border border-border rounded-lg outline-none"
      />
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 cursor-pointer"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-border rounded hover:bg-muted cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditForm;
