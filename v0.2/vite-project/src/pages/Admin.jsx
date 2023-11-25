//Admin.jsx

import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";

// Composant pour afficher les utilisateurs
const UserList = ({ users }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id} className="mb-2 flex items-center justify-between">
          <div>
            <span className="mr-2">{/* Icône d'utilisateur ici */}</span>
            {user.username} - {user.email}
          </div>
          <div className="flex">
            <Link to={`/adminpage/edit-user/${user.id}`} className="mr-2">
              {/* Icône pour modifier l'utilisateur */}
              🖊️
            </Link>
            <button onClick={() => handleDeleteUser(user.id)}>
              {/* Icône pour supprimer l'utilisateur */}❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// Composant pour afficher les clefs
const KeyList = ({ keys }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Liste des Clés</h2>
    <ul>
      {keys.map((key) => (
        <li key={key.id} className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`/src/images/${key.image}`}
              alt={key.name}
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{key.name}</h3>
              <p className="text-gray-600">{key.land}</p>
            </div>
          </div>
          <div className="flex">
            <Link to={`/adminpage/edit-key/${key.id}`} className="mr-2">
              {/* Icône pour modifier la clé */}
              🖊️
            </Link>
            <button onClick={() => handleDeleteKey(key.id)}>
              {/* Icône pour supprimer la clé */}❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const AdminPage = () => {
  // Etat pour les utilisateurs
  const [users, setUsers] = useState([]);

  // Effet pour charger les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3005/users");
        if (response.ok) {
          const userData = await response.json();
          setUsers(userData);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  // Etat pour les clefs
  const [keys, setKeys] = useState([]);

  // Effet pour charger les clefs
  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await fetch("http://localhost:3005/keys");
        if (response.ok) {
          const keysData = await response.json();
          setKeys(keysData);
        }
      } catch (error) {
        console.error("Error fetching keys:", error.message);
      }
    };

    fetchKeys();
  }, []);

  return (
    <div className="flex h-screen bg-gray-800">
      {/* ... (barre latérale) */}
      <div className="w-64 bg-gray-900">
        <div className="flex items-center justify-center mt-10">
          <span className="text-white text-2xl font-semibold">
            Administration
          </span>
        </div>
        <nav className="mt-10">
          <Link to="/adminpage/users" className="block py-2 px-4 text-white">
            Utilisateurs
          </Link>
          <Link to="/adminpage/keys" className="block py-2 px-4 text-white">
            Clefs
          </Link>
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <Routes>
            {/* Route pour afficher la liste des utilisateurs */}
            <Route
              path="users"
              element={
                <div className="p-6">
                  <UserList users={users} />
                </div>
              }
            />

            {/* Route pour afficher la liste des clefs */}
            <Route
              path="keys"
              element={
                <div className="p-6">
                  <KeyList keys={keys} />
                </div>
              }
            />

            {/* Route par défaut (peut être une page d'accueil ou une redirection) */}
            <Route
              index
              element={
                <div className="p-6">Bienvenue dans l'administration</div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
