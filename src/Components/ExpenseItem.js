import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "./ExpenseItem.css";

const ExpenseItem = ({ expense, removeData, editData }) => {
  const { id, charge, amount } = expense;
  const handleDelete = (id) => {
    removeData(id);
  };

  const handleEdit = (id, charge, amount) => {
    editData(id, charge, amount);
  };

  return (
    <li>
      <div>
        <span className="charge">{charge}</span>
      </div>
      <div>
        <span className="amount">${amount}</span>
      </div>
      <div className="btnEd">
        <button
          onClick={() => {
            handleEdit(id, charge, amount);
          }}
          className="edit"
        >
          <MdEdit />
        </button>
        <button
          onClick={() => {
            handleDelete(id);
          }}
          className="delete"
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
