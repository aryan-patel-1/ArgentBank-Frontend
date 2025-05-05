import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const postForm = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    const email = postForm.current[0].value;
    const password = postForm.current[1].value;

    console.log("Données envoyées:", { email, password });

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Statut de la réponse:", response.status);
      console.log("Réponse complète:", data);

      if (response.ok) {
        const token = data.body.token;
        localStorage.setItem("authToken", token); // ✅ Stockage du token
        navigate("/user"); // redirection utilisateur
      } else {
        setError(data.message || "Échec de connexion");
      }
    } catch (error) {
      console.error("Erreur complète:", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <form ref={postForm} onSubmit={handleForm}>
      {error && (
        <div ref={errorRef} className="form-error" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
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
