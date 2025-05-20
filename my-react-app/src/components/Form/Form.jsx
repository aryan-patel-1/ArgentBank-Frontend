import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { loginUser, getUserProfile } from "../../Redux/userSlice"; 

const Form = () => {
  const postForm = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    const email = postForm.current[0].value;
    const password = postForm.current[1].value;
    const remember = postForm.current[2].checked; // Récupérer la valeur du checkbox

    console.log("Données envoyées:", { email, password });

    try {
      // Utilisation du thunk loginUser
      const action = await dispatch(loginUser({ email, password, remember }));

      // Vérification de la réussite du thunk
      if (action.error) {
        setError("Email or Password incorrect"); // Message d'erreur spécifique
      } else {
        // Récupérer le profil utilisateur avec le token
        const token = action.payload.token;
        const userAction = await dispatch(getUserProfile(token));

        if (userAction.error) {
          setError(userAction.error.message); // Gestion de l'erreur de récupération du profil
        } else {
          navigate("/user"); // Redirection vers la page utilisateur si tout est ok
        }
      }
    } catch (error) {
      console.error("Erreur complète:", error);
      setError("Email or Password incorrect");
    }
  };

  return (
    <form ref={postForm} onSubmit={handleForm}>
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
        {error && <div className="input-error">{error}</div>}
      </div>
      <div className="input-remember">
        <input id="remember-me" name="remember" type="checkbox" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
};

export default Form;