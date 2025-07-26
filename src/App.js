import React, { useState, useEffect } from 'react';

function App() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomeInput, setIncomeInput] = useState({ source: '', amount: '', date: '' });
  const [expenseInput, setExpenseInput] = useState({ source: '', amount: '', date: '' });

  const [targetSaving, setTargetSaving] = useState(0);
  const [currentSaving, setCurrentSaving] = useState(0);
  const [balance, setBalance] = useState(0);

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
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalExpense = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const newBalance = totalIncome - totalExpense - currentSaving;
    setBalance(newBalance);
  }, [incomes, expenses, currentSaving]);

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
              <button onClick={() => {
                const updated = [...incomes];
                updated.splice(idx, 1);
                setIncomes(updated);
              }}>
                ❌
              </button>
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
              <button onClick={() => {
                const updated = [...expenses];
                updated.splice(idx, 1);
                setExpenses(updated);
              }}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Saving Target Section */}
      <div>
        <h3>Set target</h3>
        <input
          type="number"
          placeholder="Enter target saving"
          value={targetSaving}
          onChange={(e) => setTargetSaving(Number(e.target.value))}
        />
        <br />
        <h3>Current saving</h3>
        <input
          type="number"
          placeholder="Enter current saving"
          value={currentSaving}
          onChange={(e) => setCurrentSaving(Number(e.target.value))}
        />
        <br />
        <p>Current saving: {currentSaving}</p>
        <p>Target: {targetSaving}</p>
        <p>
          Progress: {targetSaving > 0 ? ((currentSaving / targetSaving) * 100).toFixed(0) : 0}%
        </p>

        <p>Current balance: {balance}</p>

        <button onClick={() => {
          setCurrentSaving(currentSaving + balance);
          setBalance(0);
        }}>
          Transfer to saving account
        </button>
      </div>
    </div>
  );
}

export default App;
