//Admin.jsx

import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import ItemMod from "../components/itemMod";
import CreateKey from "../components/createKey";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

// Fonction générique pour gérer la suppression d'un élément (utilisateur ou clef)
const handleDelete = async (type, id, setFunction) => {
  const endpoint = type === "user" ? "users" : "keys";

  try {
    const response = await fetch(`${apiUrl}${endpoint}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Mettez à jour la liste après la suppression
      setFunction((prevItems) => prevItems.filter((item) => item._id !== id));
    } else {
      console.error(`Error deleting ${type}:`, response.statusText);
    }
  } catch (error) {
    console.error(`Error deleting ${type}:`, error.message);
  }
};

// Composant pour afficher les utilisateurs
const UserList = ({ users, setUsers }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h2>
    <ul>
      {users.map((user) => (
        <li key={user._id} className="mb-2 flex items-center ">
          <div className="flex items-center">
            <img
              src={user?.avatar || `../../public/Images/Avatars/avatar_default.jpg`}
              alt={user.username}
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.username}</h3>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <div className="flex ml-auto">
            <Link to={`/adminpage/edit-user/${user._id}`} className="mr-2">
              {/* Icône pour modifier l'utilisateur */}
              🖊️
            </Link>
            <button onClick={() => handleDelete("user", user._id, setUsers)}>
              {/* Icône pour supprimer l'utilisateur */}❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

// Composant pour afficher les clefs
const KeyList = ({ keys, setKeys }) => {
  //console.log("setKeys:", setKeys);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des Clefs</h2>
      <ul>
        {keys.map((key) => (
          <li key={key._id} className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                //src={`/src/images/${key.image.inBox}`}
                // Affichage url cloudinary
                src={key.image?.inBox || "https://res.cloudinary.com/colleckeytion/image/upload/v1741006301/CollecKeytion/others/key_placeholder.jpg"}
                alt={key.name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{key.name}</h3>
                <p className="text-gray-400">{key.land}</p>
              </div>
            </div>
            <div className="flex">
              <Link to={`/adminpage/edit-key/${key._id}`} className="mr-2">
                {/* Icône pour modifier la clef */}
                🖊️
              </Link>
              <button onClick={() => handleDelete("key", key._id, setKeys)}>
                {/* Icône pour supprimer la clef */}❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AdminPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { keyId } = useParams();
  // Etat pour les utilisateurs
  const [users, setUsers] = useState([]);
  // Etat pour les clefs
  const [keys, setKeys] = useState([]);

  // Effet pour charger les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}users`);
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

  // Effet pour charger les clefs
  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await fetch(`${apiUrl}keys`);
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
          <Link to="/adminpage">
            <span className="text-white text-2xl font-semibold">
              Administration
            </span>
          </Link>
        </div>
        <nav className="mt-10">
          <Link to="/adminpage/users" className="block py-2 px-4 text-white">
            Utilisateurs
          </Link>
          <Link to="/adminpage/keys" className="block py-2 px-4 text-white">
            Clefs
          </Link>
          <Link
            to="/adminpage/createKey"
            className="block py-2 px-4 text-white"
          >
            Créer une clef
          </Link>
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-700">
          <Routes>
            {/* Route pour afficher la liste des utilisateurs */}
            <Route
              path="users"
              element={
                <div key="userList" className="p-6 text-white">
                  <UserList users={users} setUsers={setUsers} />
                </div>
              }
            />

            {/* Route pour afficher la liste des clefs */}
            <Route
              path="keys"
              element={
                <div key="keyList" className="p-6 text-white">
                  <KeyList keys={keys} setKeys={setKeys} />
                </div>
              }
            />

            {/* Route pour afficher l'interface de création des clefs */}
            <Route
              path="createKey"
              element={
                <div key="createKey" className="p-6 text-white">
                  <CreateKey />
                </div>
              }
            />

            <Route
              path="edit-user/:id"
              element={
                <div className="p-6">
                  <ItemMod type="user" />
                </div>
              }
            />

            <Route
              path="edit-key/:id"
              element={
                <div className="p-6">
                  <ItemMod type="key" />
                </div>
              }
            />

            {/* Route par défaut (peut être une page d'accueil ou une redirection) */}
            <Route
              index
              element={
                <div className="p-6 text-white">Bienvenue dans l&apos;administration</div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
