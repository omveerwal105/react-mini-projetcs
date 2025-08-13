import React, { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ name: "", amount: "" });
  const [editId, setEditId] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("expense");
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }, [expenses]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle add/update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.amount <= 0) {
      alert("Enter a valid name and positive amount!");
      return;
    }

    if (editId !== null) {
      // Update expense
      const updated = expenses.map((exp) =>
        exp.id === editId ? { ...exp, ...formData } : exp
      );
      setExpenses(updated);
      setEditId(null);
    } else {
      // Add new expense
      const newExpense = {
        name: formData.name,
        amount: Number(formData.amount),
        id: Date.now(),
      };
      setExpenses((prev) => [...prev, newExpense]);
    }

    // Reset form
    setFormData({ name: "", amount: "" });
  };

  // Handle delete
  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  // Handle edit
  const handleEdit = (id) => {
    const toEdit = expenses.find((exp) => exp.id === id);
    setFormData({ name: toEdit.name, amount: toEdit.amount });
    setEditId(id);
  };

  // Calculate total
  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  // Sorted list without mutating state
  const sortedExpenses = [...expenses].sort((a, b) => a.amount - b.amount);

  return (
    <div
      className="container p-4 shadow rounded bg-light mt-4"
      style={{ maxWidth: "500px" }}
    >
      <h2 className="text-center mb-4">💰 Expense Tracker</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Enter expense name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            className="form-control"
            type="number"
            placeholder="Enter amount"
            value={formData.amount}
            name="amount"
            onChange={handleChange}
          />
        </div>
        <button
          className={`btn w-100 ${editId ? "btn-success" : "btn-primary"}`}
          type="submit"
        >
          {editId ? "Save Changes" : "Add Expense"}
        </button>
      </form>

      {/* Expense List */}
      <div className="mb-3">
        {sortedExpenses.length > 0 ? (
          sortedExpenses.map((expense) => (
            <ExpenseList
              key={expense.id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-muted">No expenses added yet.</p>
        )}
      </div>

      {/* Total */}
      <div className="text-center p-2 bg-white rounded shadow-sm">
        <strong>Total Expense: </strong> ₹{totalExpense}
      </div>
    </div>
  );
};

export default ExpenseForm;
