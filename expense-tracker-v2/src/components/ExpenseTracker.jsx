import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const ExpenseTracker = () => {
  const { state, dispatch } = useContext(ExpenseContext);

  const [formData, setFormData] = useState({
    name: "",
    amount: ""
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.amount.trim()) {
      alert("Enter the required field");
      return;
    }
    if(editId !== null){
        dispatch({
            type : "EDIT",
            payload : {id : editId , updatedData : formData}
        })
        setEditId(null);
    }

    else {

    dispatch({
      type: "ADD",
      payload: formData
    });

}

    setFormData({ name: "", amount: "" });
  };

  const handleDelete = (id) => {
    dispatch({
      type: "DELETE",
      payload: id
    });
  };

  const handleEdit = (expense) => {
    setFormData({name : expense.name , amount:expense.amount});
    setEditId(expense.id);
  }

  const totalAmount = state.expenses.reduce((sum , expense)=>sum + Number(expense.amount) ,0);

  return (
    <div className="container p-4">
         <h2 className="mb-4 text-center">💰 Expense Tracker</h2>
      <form onSubmit={handleSubmit} className="mb-4 ">
            <div className="mb-2">
          <input
            className="form-control w-50"
            placeholder="Enter expense name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            className="form-control w-50"
            placeholder="Enter amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <button className={`btn ${editId ? "btn-info" : "btn-success"}`} type="submit">
          {editId ? 'Update' : 'ADD'}
        </button>
      </form>
      <p className="fw-bold"><strong>Total Amount: </strong>{totalAmount}</p>

      {state.expenses.map((expense) => (
        <div className="card mx-auto mt-3 shadow-sm"style={{ maxWidth: "600px" }} key={expense.id}>
          <div className="card-header bg-primary text-white">
            <h4 className="text-center card-title">{expense.name}</h4>
          </div>
          <div className="card-body">
             <p className="mb-3">
                  <strong>Amount: </strong>₹
                  {expense.amount.toLocaleString("en-IN")}
                </p>
            <button className="btn btn-warning me-2" onClick={()=>handleEdit(expense)}>
                Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(expense.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseTracker;
