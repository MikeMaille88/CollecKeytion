// forgetPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

const ForgetPassword = () => {
  const [user, setUser] = useState({
    email: "",
    frontendUrl: frontendUrl,
  });
  const [message, setMessage] = useState(""); // Gère le message de succès/erreur
  const [error, setError] = useState(""); // Gère le message d'erreur

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi de la requête pour ajouter un utilisateur
      const response = await fetch(`${apiUrl}users/forgetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // Vérifie si la requête a réussi
      if (response.ok) {
        setMessage("Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception.");
        setError(""); // Efface le message d'erreur si la requête réussit
      } else {
        console.error("Error Finding user: response", response.statusText);
        setError(response.message || "Une erreur s'est produite.");
        setMessage(""); // Efface le message de succès en cas d'erreur
      }
    } catch (error) {
      console.error("Error Finding user:", error.message);
      setError("Impossible de contacter le serveur.");
      setMessage("");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-20 h-20 mr-2"
            src="/Images/CollecKeytion_Logo.png"
            alt="logo"
          />
          CollecKeytion{" "}
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              J'ai oublié mon mot de passe
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Votre email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Changer le mot de passe
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous n&apos;avez pas encore de compte ?{" "}
                <Link to="/registration"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Créer un compte ici
                </Link>
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous avez déjà un compte ?{" "}
                <Link to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Connectez-vous ici
                </Link>
              </p>
            </form>

            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
