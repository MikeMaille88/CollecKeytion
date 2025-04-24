// CreateUser.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordValidator from "../components/passwordValidator"; 

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

const CreateUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    
    // Réinitialiser les erreurs lors de la modification du champ
    if (e.target.name === 'password') {
      setErrors(errors.filter(err => !err.msg.includes('mot de passe')));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Réinitialiser les erreurs
    setErrors([]);

    // Vérifier la validité du mot de passe avant soumission
    // const passwordRegex = {
    //   minLength: user.password.length >= 12,
    //   lowercase: /[a-z]/.test(user.password),
    //   uppercase: /[A-Z]/.test(user.password),
    //   number: /[0-9]/.test(user.password),
    //   special: /[!@#$%^&*(),.?":{}|<>]/.test(user.password)
    // };

    // // Si le mot de passe ne respecte pas les critères
    // if (!Object.values(passwordRegex).every(Boolean)) {
    //   setErrors([{ 
    //     param: 'password', 
    //     msg: "Le mot de passe doit contenir au moins 12 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial" 
    //   }]);
    //   return;
    // }

    try {
      const response = await fetch(`${apiUrl}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setAccountCreated(true);
        setIsConfirmModalOpen(true);
      } else {
        // Afficher les erreurs retournées par le serveur
        if (data.errors && Array.isArray(data.errors)) {
          setErrors(data.errors);
        } else {
          setErrors([{ msg: "Une erreur est survenue lors de la création du compte" }]);
        }
        console.error("Erreur lors de la création du compte:", data);
      }
    } catch (error) {
      setErrors([{ msg: "Erreur de connexion au serveur" }]);
      console.error("Erreur lors de la création du compte:", error.message);
    }
  };

  const handleConfirm = () => {
    setIsConfirmModalOpen(false);
    if (accountCreated) {
      navigate("/login");
    }
  };

  // Trouver l'erreur pour un champ spécifique
  const getFieldError = (fieldName) => {
    return errors.find(err => err.param === fieldName)?.msg;
  };

  return (
    <section className="bg-gray-900 dark:bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-gray-900">
          <img className="w-20 h-20 mr-2" src="/Images/CollecKeytion_Logo.png" alt="logo" />
          CollecKeytion
        </Link>
        <div className="w-full bg-gray-800 rounded-lg shadow border-gray-700 md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-gray-900">
              Créer un compte
            </h1>
            
            {/* Afficher les messages d'erreur généraux */}
            {errors.length > 0 && !errors.some(err => err.param) && (
              <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                <ul className="list-disc pl-5">
                  {errors.map((err, index) => (
                    <li key={index}>{err.msg}</li>
                  ))}
                </ul>
              </div>
            )}
            
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
                  className={`bg-gray-700 border ${getFieldError('username') ? 'border-red-500' : 'border-gray-600'} text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Username"
                  required
                />
                {getFieldError('username') && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{getFieldError('username')}</p>
                )}
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
                  className={`bg-gray-700 border ${getFieldError('email') ? 'border-red-500' : 'border-gray-600'} text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="name@company.com"
                  required
                />
                {getFieldError('email') && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{getFieldError('email')}</p>
                )}
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
                  placeholder="••••••••••••"
                  className={`bg-gray-700 border ${getFieldError('password') ? 'border-red-500' : 'border-gray-600'} text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  required
                />
                {getFieldError('password') && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{getFieldError('password')}</p>
                )}
                
                {/* Composant de validation visuelle */}
                <PasswordValidator password={user.password} />
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
};

export default CreateUser;
