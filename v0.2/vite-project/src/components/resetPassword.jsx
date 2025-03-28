// resetPassword.jsx
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

const ResetPassword = () => {
  const { token } = useParams(); // Récupère le token passé dans l'URL
  console.log("Token extrait de l'URL :", token);

  const [user, setUser] = useState({
    email: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (user.password1 !== user.password2) {
      console.error("Passwords do not match");
      return;
    }
  
    const data = {
      newPassword: user.password1, // Envoi du bon champ
    };

    try {
      const response = await fetch(`${apiUrl}users/resetPassword/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Envoi du bon format
      });
  
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error resetting password:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };  

  return (
    <section className="bg-gray-900 dark:bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="#"
          className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-gray-900"
        >
          <img
            className="w-20 h-20 mr-2"
            src="/Images/CollecKeytion_Logo.png"
            alt="logo"
          />
          CollecKeytion{" "}
        </Link>
        <div className="w-full bg-gray-800 rounded-lg shadow dark:bg-white md:mt-0 sm:max-w-md xl:p-0 border-gray-700 dark:border">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-gray-900">
              I forgot my password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white dark:text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div> */}
              <div>
                <label
                  htmlFor="password1"
                  className="block mb-2 text-sm font-medium text-white dark:text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password1"
                  id="password1"
                  value={user.password1}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="block mb-2 text-sm font-medium text-white dark:text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  value={user.password2}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset my password
              </button>
              <p className="text-sm font-light text-gray-400 dark:text-gray-500">
                Already have an account?{" "}
                <Link to="/login"
                  className="font-medium text-primary-500 hover:underline dark:text-primary-600"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}  

export default ResetPassword;
