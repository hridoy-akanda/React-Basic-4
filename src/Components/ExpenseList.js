import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";
import "./ExpenseList.css";

const ExpenseList = ({
  expenses,
  setExpenses,
  removeData,
  handleAlert,
  editData,
}) => {
  const handleDelAll = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All items deleted" });
  };

  return (
    <>
      <ul>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            removeData={removeData}
            editData={editData}
          />
        ))}
      </ul>
      {expenses.length > 0 && (
        <button onClick={handleDelAll} className="btn">
          Clear Expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
