import { useState } from 'react';
import './Transaction.scss';

const Transaction = () => {
  const [transactions] = useState([
    {
      date: '27/02/20',
      description: 'Golden Sun Bakery',
      amount: '$8.00',
      balance: '$298.00',
      transactionType: 'Electronic',
      category: 'Food',
      notes: 'Lorem ipsum'
    },
    {
      date: '27/02/20',
      description: 'Golden Sun Bakery',
      amount: '$8.00',
      balance: '$298.00',
      transactionType: 'Electronic',
      category: 'Food',
      notes: 'Lorem ipsum'
    },
    {
      date: '27/02/20',
      description: 'Golden Sun Bakery',
      amount: '$8.00',
      balance: '$298.00',
      transactionType: 'Electronic',
      category: 'Food',
      notes: 'Lorem ipsum'
    }
  ]);

  return (
    <main className="main bg-dark transaction-page">
      <div className="transaction-header">
        <h1>Argent Bank Checking (x8349)</h1>
        <p className="account-balance">$48,098.43</p>
        <p className="balance-type">Available Balance</p>
      </div>

      <section className="transactions-list">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <div className="transaction-details">
              <div className="transaction-date">{transaction.date}</div>
              <div className="transaction-description">{transaction.description}</div>
              <div className="transaction-amount">{transaction.amount}</div>
              <div className="transaction-balance">{transaction.balance}</div>
            </div>
            <div className="transaction-edit">
              <div className="transaction-type">
                Transaction Type: {transaction.transactionType}
              </div>
              <div className="transaction-category">
                <label>Category</label>
                <select>
                  <option>{transaction.category}</option>
                </select>
              </div>
              <div className="transaction-notes">
                <label>Notes</label>
                <input type="text" defaultValue={transaction.notes} />
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Transaction;