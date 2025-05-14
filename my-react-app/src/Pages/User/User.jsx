import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setUserName } from '../../Redux/userSlice'; 
import { useNavigate } from 'react-router-dom';
import './user.scss';

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Utiliser le state Redux de façon sécurisée
  const userState = useSelector((state) => state.user || {});
  const isAuthenticated = userState.isAuthenticated || false;
  const token = userState.token || null;
  const userName = userState.userName || 'Utilisateur'; // Récupérer le nom de l'utilisateur depuis Redux

  // États pour le nom d'utilisateur
  const [firstName, setFirstName] = useState(userName.split(" ")[0]);
  const [lastName, setLastName] = useState(userName.split(" ")[1] || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    const newUserName = `${firstName} ${lastName}`;
    dispatch(setUserName(newUserName)); // Mise à jour Redux
  
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Token d'auth obligatoire
        },
        body: JSON.stringify({ userName: newUserName }), // Nom à mettre à jour
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Nom mis à jour avec succès :", data);
      } else {
        console.error("Erreur côté API :", data.message);
      }
    } catch (error) {
      console.error("Erreur de communication avec l'API :", error);
    }
  
    setIsEditing(false);
  };
  

  // Si non authentifié
  if (!isAuthenticated) {
    return (
      <div className="error-container">
        <h2>Accès non autorisé</h2>
        <p>Veuillez vous connecter pour accéder à cette page.</p>
      </div>
    );
  }

  return (
    <main className="bg-dark-user">
      <div className="header">
        {!isEditing ? (
          <>
            <h1>Welcome back<br />{firstName} {lastName}!</h1>
            <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
          </>
        ) : (
          <div className="edit-user-container">
            <h1>Edit user info</h1>
            <div className="edit-form-container">
              <div className="input-group">
                <label htmlFor="userName">User name:</label>
                <input 
                  type="text" 
                  id="userName" 
                  value={`${firstName}_${lastName}`.toLowerCase()}
                  disabled
                  className="input-disabled"
                />
              </div>
              <div className="input-group">
                <label htmlFor="firstName">First name:</label>
                <input 
                  type="text" 
                  id="firstName" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-editable"
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last name:</label>
                <input 
                  type="text" 
                  id="lastName" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-editable"
                />
              </div>
              <div className="button-group">
                <button type="button" className="save-button" onClick={handleSaveClick}>Save</button>
                <button type="button" className="cancel-button" onClick={handleEditClick}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      {/* Comptes bancaires */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
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
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
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
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
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
    </main>
  );
}

export default User;