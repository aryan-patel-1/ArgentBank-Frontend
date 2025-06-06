import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserProfile, updateUserName } from '../../Redux/userSlice';
import Account from '../../components/Account/Account';
import './user.scss';

function User() {
  const dispatch = useDispatch();
  const { userName, firstName, lastName, token, isAuthenticated } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editableUserName, setEditableUserName] = useState(userName);

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    setEditableUserName(userName);
  }, [userName]);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setEditableUserName(userName);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    if (editableUserName.trim() !== userName) {
      dispatch(updateUserName({ newUserName: editableUserName, token }));
    }
    setIsEditing(false);
  };

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
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                  <label htmlFor="userName">User Name:</label>
                  <input
                    type="text"
                    id="userName"
                    className="input-editable"
                    value={editableUserName}
                    onChange={(e) => setEditableUserName(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    className="input-disabled"
                    value={firstName || ''}
                    disabled
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    className="input-disabled"
                    value={lastName || ''}
                    disabled
                  />
                </div>

                <div className="button-group">
                  <button type="button" className="save-button" onClick={handleSaveClick}>Save</button>
                  <button type="button" className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Account />
    </main>
  );
}

export default User;
