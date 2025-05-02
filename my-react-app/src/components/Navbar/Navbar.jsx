import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import './Navbar.scss';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false); 
    setUser(null);
    navigate("/"); 
  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar__logo" aria-current="page">
          {}
          <img src="/img/argentBankLogo.png" alt="Argent Bank logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        {!isAuthenticated ? (
          <Link
            to="/signIn"
            className="navbar__link"
            aria-label="Sign In to your account"
          >
            <i>
              <FontAwesomeIcon icon={faCircleUser} />
            </i>
            <span>Sign In</span>
          </Link>
        ) : (
          <div className="log">
            <Link to="/user" className="navbar__link">
              <i>
                <FontAwesomeIcon icon={faCircleUser} />
              </i>
              <span>{user?.userName}</span>
            </Link>
            <button onClick={handleLogout} className="navbar__link">
              <i>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </i>
              <span>Log Out</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
