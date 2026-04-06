import { useState } from "react";

export default function TransactionTable({ data, role, setData }) {
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "expense",
  });

  // 🔍 Filter
  const filtered = data.filter((d) =>
    d.category.toLowerCase().includes(search.toLowerCase()),
  );

  // ➕ Add realistic transaction
  const addTransaction = () => {
    const categories = ["Food", "Transport", "Shopping", "Bills"];

    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      amount: Math.floor(Math.random() * 1000) + 100,
      category: categories[Math.floor(Math.random() * categories.length)],
      type: "expense",
    };

    setData([...data, newTx]);
  };

  return (
    <div className="neu p-6 rounded-2xl max-h-[300px] overflow-y-auto">
      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-3">
        <input
          placeholder="Search by category..."
          className="border p-2 rounded w-full sm:w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />

        {role === "admin" && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Transaction
          </button>
        )}
      </div>
      {showForm && (
        <div className="mb-4 space-y-2">
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="border p-2 w-full"
          />

          <input
            type="text"
            placeholder="Category (Food, Shopping...)"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="border p-2 w-full"
          />

          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="border p-2 w-full"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={() => {
              const newTx = {
                id: Date.now(),
                date: new Date().toISOString().slice(0, 10),
                amount: Number(formData.amount),
                category: formData.category,
                type: formData.type,
              };

              setData([...data, newTx]);

              setShowForm(false);
              setFormData({ amount: "", category: "", type: "expense" });
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Transaction
          </button>
        </div>
      )}

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="border-b text-left">
          <tr>
            <th className="py-2">Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {[...filtered].reverse().map((tx) => (
            <tr key={tx.id} className="border-b">
              {/* Date */}
              <td className="py-2">{tx.date}</td>

              {/* Amount (Editable) */}
              <td>
                {editId === tx.id ? (
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border p-1 w-20"
                  />
                ) : (
                  <span className="font-medium">₹{tx.amount}</span>
                )}
              </td>

              {/* Category */}
              <td>{tx.category}</td>

              {/* Type */}
              <td
                className={
                  tx.type === "income"
                    ? "text-green-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {tx.type}
              </td>

              {/* ACTION BUTTONS */}
              <td>
                {role === "admin" && tx.type === "income" && (
                  <>
                    {editId === tx.id ? (
                      <button
                        onClick={() => {
                          const updated = data.map((d) =>
                            d.id === tx.id
                              ? { ...d, amount: Number(editValue) }
                              : d,
                          );
                          setData(updated);
                          setEditId(null);
                        }}
                        className="text-green-500 mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditId(tx.id);
                          setEditValue(tx.amount);
                        }}
                        className="text-blue-500"
                      >
                        Edit
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-3">No transactions found</p>
      )}
    </div>
  );
}
