import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Account.scss';

function Account() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return (
      <div className="error-container">
        <h2>Accès non autorisé</h2>
        <p>Veuillez vous connecter pour accéder à cette page.</p>
      </div>
    );
  }

  const accounts = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      description: 'Available Balance',
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      description: 'Available Balance',
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      description: 'Current Balance',
    },
  ];

  return (
    <main className="bg-dark-account">
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((acc, index) => (
        <section className="account" key={index}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{acc.title}</h3>
            <p className="account-amount">{acc.amount}</p>
            <p className="account-amount-description">{acc.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button
              className="transaction-button"
              onClick={() => navigate('/transactions')}
            >
              View transactions
            </button>
          </div>
        </section>
      ))}
    </main>
  );
}

export default Account;
