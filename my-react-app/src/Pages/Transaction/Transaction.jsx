import { useState } from 'react';
import './Transaction.scss';
// Import de Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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
    <main className="bg-dark-transaction transaction-page">
      <div className="transaction-header">
        <h1>Argent Bank Checking (x8349)</h1>
        <p className="account-balance">$48,098.43</p>
        <p className="balance-type">Available Balance</p>
      </div>

      <section className="transactions-list">
        <div className="transaction-table-header">
          <div className="column-date">Date</div>
          <div className="column-description">Description</div>
          <div className="column-amount">Amount</div>
          <div className="column-balance">Balance</div>
        </div>
        
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <div className="transaction-details">
              <div className="column-date" data-label="Date">{transaction.date}</div>
              <div className="column-description" data-label="Description">{transaction.description}</div>
              <div className="column-amount" data-label="Amount">{transaction.amount}</div>
              <div className="column-balance" data-label="Balance">{transaction.balance}</div>
            </div>
            <div className="transaction-edit">
              <div className="transaction-type">
                Transaction type: <span>{transaction.transactionType}</span>
              </div>
              <div className="transaction-category">
                <label>Category:</label>
                <span className="editable-field">
                  {transaction.category}
                  <FontAwesomeIcon icon={faPencilAlt} className="edit-icon" />
                </span>
              </div>
              <div className="transaction-notes">
                <label>Note:</label>
                <span className="editable-field">
                  {transaction.notes}
                  <FontAwesomeIcon icon={faPencilAlt} className="edit-icon" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Transaction;