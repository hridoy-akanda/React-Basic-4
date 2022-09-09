import React, { useState } from "react";
import Alert from "./Components/Alert";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { useEffect } from "react";

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

const App = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const editData = (id, charge, amount) => {
    setEdit(true);
    setCharge(charge);
    setAmount(amount);
    setId(id);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 4000);
  };

  const addData = (charge, amount) => {
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tmpExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tmpExpenses);
        handleAlert({
          type: "success",
          text: "item edited",
        });
        setEdit(false);
      } else {
        const newExpense = { id: uuidv4(), charge: charge, amount: amount };
        setExpenses([...expenses, newExpense]);
        handleAlert({
          type: "success",
          text: "item added",
        });
      }
    } else {
      handleAlert({
        type: "danger",
        text: "charge can't be empty and amount must be greater than zero",
      });
    }
  };
  const removeData = (id) => {
    const filteredData = expenses.filter((expense) => {
      return expense.id !== id;
    });
    setExpenses(filteredData);
    handleAlert({
      type: "danger",
      text: "item removed",
    });
  };

  return (
    <div className="container">
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Expense Calculator </h1>
      <main>
        <ExpenseForm
          handleAdd={addData}
          edit={edit}
          charge={charge}
          amount={amount}
          setCharge={setCharge}
          setAmount={setAmount}
        />
        <ExpenseList
          expenses={expenses}
          setExpenses={setExpenses}
          removeData={removeData}
          handleAlert={handleAlert}
          editData={editData}
        />
      </main>
      <h1>
        Total Spending: $
        {expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}
      </h1>
    </div>
  );
};

export default App;
