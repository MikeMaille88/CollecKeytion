import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

const CreateUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setAccountCreated(true);
        setIsConfirmModalOpen(true); // Ouvre la modale
      } else {
        console.error("Erreur lors de la création du compte:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la création du compte:", error.message);
    }
  };

  const handleConfirm = () => {
    setIsConfirmModalOpen(false);
    if (accountCreated) {
      navigate("/"); // Redirige après la fermeture de la modale
    }
  };

  return (
    <section className="bg-gray-900 dark:bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-gray-900">
          <img className="w-20 h-20 mr-2" src="/Images/CollecKeytion_Logo.png" alt="logo" />
          CollecKeytion
        </Link>
        <div className="w-full bg-gray-800 rounded-lg shadow border-gray-700 md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-gray-900">
              Créer un compte
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">
                  Votre pseudo
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={user.username}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">
                  Votre email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  value={user.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Créer votre compte
              </button>
              <p className="text-sm font-light text-gray-400 dark:text-gray-500">
                Vous avez déjà un compte ?{" "}
                <Link to="/login" className="font-medium text-primary-500 hover:underline dark:text-primary-600">
                  Connectez-vous ici
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white dark:bg-white dark:text-gray-900">
            <p className="mb-4">Votre compte a bien été créé !</p>
            <button onClick={handleConfirm} className="bg-gray-600 text-white px-4 py-2 rounded dark:bg-gray-300 dark:text-gray-800">
              Ok
            </button>
          </div>
        </div>
      )}
    </section>
  );
}  

export default CreateUser;
