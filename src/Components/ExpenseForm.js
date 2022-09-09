import React from "react";
import "./ExpenseForm.css";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  handleAdd,
  edit,
  charge,
  setCharge,
  amount,
  setAmount,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(charge, amount);
    setCharge("");
    setAmount("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div>
            <label htmlFor="charge"></label>
            <input
              type="text"
              placeholder="charge"
              name="charge"
              id="charge"
              value={charge}
              onChange={(e) => {
                setCharge(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="amount"></label>
            <input
              type="number"
              placeholder="amount"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
        </div>

        <button type="submit">
          {edit ? "Edit" : "Add"} <MdSend className="btn-icon" />
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
