import React, { useState } from 'react';

function App() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomeInput, setIncomeInput] = useState({ source: '', amount: '', date: '' });
  const [expenseInput, setExpenseInput] = useState({ source: '', amount: '', date: '' });

  const handleIncomeChange = (e) => {
    setIncomeInput({ ...incomeInput, [e.target.name]: e.target.value });
  };

  const handleExpenseChange = (e) => {
    setExpenseInput({ ...expenseInput, [e.target.name]: e.target.value });
  };

  const addIncome = () => {
    setIncomes([...incomes, incomeInput]);
    setIncomeInput({ source: '', amount: '', date: '' });
  };

  const addExpense = () => {
    setExpenses([...expenses, expenseInput]);
    setExpenseInput({ source: '', amount: '', date: '' });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toDateString();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '30px' }}>
      {/* Income Section */}
      <div>
        <h3>Income source</h3>
        <input name="source" value={incomeInput.source} onChange={handleIncomeChange} placeholder="e.g. Salary" />
        <br />
        <h3>Amount of income</h3>
        <input name="amount" value={incomeInput.amount} onChange={handleIncomeChange} type="number" />
        <br />
        <h3>Date of income</h3>
        <input name="date" value={incomeInput.date} onChange={handleIncomeChange} type="date" />
        <br />
        <button onClick={addIncome}>Add income</button>
        <ul>
          {incomes.map((inc, idx) => (
            <li key={idx}>
              {inc.source}: {inc.amount}EUR on {formatDate(inc.date)}
            </li>
          ))}
        </ul>
      </div>

      {/* Expense Section */}
      <div>
        <h3>Expense source</h3>
        <input name="source" value={expenseInput.source} onChange={handleExpenseChange} placeholder="e.g. Rent" />
        <br />
        <h3>Amount of expense</h3>
        <input name="amount" value={expenseInput.amount} onChange={handleExpenseChange} type="number" />
        <br />
        <h3>Date of expense</h3>
        <input name="date" value={expenseInput.date} onChange={handleExpenseChange} type="date" />
        <br />
        <button onClick={addExpense}>Add expense</button>
        <ul>
          {expenses.map((exp, idx) => (
            <li key={idx}>
              {exp.source}: {exp.amount}EUR on {formatDate(exp.date)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
