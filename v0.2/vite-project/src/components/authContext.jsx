// authContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("authId");

    if (!authToken) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}users/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur",
          error
        );
        localStorage.removeItem("authToken"); 
        localStorage.removeItem("authId");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
