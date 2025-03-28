// login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi de la requête pour se connecter
      const response = await fetch(`${apiUrl}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Vérifie si la requête a réussi
      if (response.ok) {
        // Obtenez les données de la réponse
        const data = await response.json();

        // Stockez le jeton d'authentification où vous en avez besoin
        // par exemple, vous pouvez le stocker dans le stockage local
        //console.log(data.authToken);
        localStorage.setItem("authToken", data.authToken);
        console.log(data);
        localStorage.setItem("authId", data.userId);
        //alert("Vous êtes connecté");
        // Redirection vers la page d'accueil après la connexion
        navigate("/");
        window.location.href = "/";
        console.log("Redirection vers la page d'accueil");
      } else {
        console.error("Error logging user:", response.statusText);
        alert("Identifiants incorrects");
      }
    } catch (error) {
      console.error("Error logging user:", error.message);
    }
  };

  return (
    <section className="bg-gray-900 dark:bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-gray-900">
          <img className="w-20 h-20 mr-2" src="Images/CollecKeytion_Logo.png" alt="logo" />
          CollecKeytion
        </Link>
        <div className="w-full bg-gray-800 dark:bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-gray-900">
              Se connecter à votre compte
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">
                  Votre email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">
                  Votre mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-500 dark:bg-gray-50 dark:border-gray-300 dark:focus:ring-gray-600 dark:ring-offset-gray-50"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-white dark:text-gray-900">
                      Se souvenir de moi
                    </label>
                  </div>
                </div>
                <Link to="/forget" className="text-sm font-medium text-teal-400 hover:underline dark:text-gray-700">
                  Mot de passe oublié ?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
              >
                Connexion
              </button>
              <p className="text-sm font-light text-white dark:text-gray-900">
                Vous n&apos;avez pas encore de compte ? {" "}
                <Link to="/registration" className="font-medium text-teal-400 hover:underline dark:text-gray-700">
                  Créer un compte ici
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
