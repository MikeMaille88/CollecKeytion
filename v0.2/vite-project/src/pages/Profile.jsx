import { useEffect, useState } from "react";
import Modal from "../components/avatarModal";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

const Profile = () => {
  const userId = localStorage.getItem("authId");

  const [userData, setUserData] = useState({
    avatar: "/Images/Avatars/avatar_default.jpg",
  });

  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAvatarSelect = (selectedAvatar) => {
    setSelectedAvatarUrl(selectedAvatar);
  };

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`${apiUrl}users/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur", error);
      }
    };

    if (userId) {
      fetchUserData(userId);
    }
  }, [userId, selectedAvatarUrl]);

  useEffect(() => {
    const updateAvatarInDatabase = async (userId, avatarUrl) => {
      try {
        const response = await fetch(`${apiUrl}users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatar: avatarUrl }),
        });

        const data = await response.json();

        if (response.ok) {
          // Mettre à jour l'état local immédiatement après la mise à jour réussie
          setUserData((prevUserData) => ({
            ...prevUserData,
            avatar: avatarUrl,
          }));
          console.log(data.message);
          // Recharge la page après la mise à jour réussie
          window.location.reload();
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'avatar", error);
      }
    };

    if (selectedAvatarUrl) {
      updateAvatarInDatabase(userId, selectedAvatarUrl);
    }
  }, [selectedAvatarUrl, userId]);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${apiUrl}users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        localStorage.removeItem("authId");
        window.location.href = "/login";
      } else {
        console.error("Erreur lors de la suppression du compte");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du compte", error);
    }
  };

  return (
    <div className="bg-slate-700 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto -mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img className="object-cover object-top w-full" src="/Images/castlebynight.jpg" alt="Castle By Night" />
        </div>
        <div
          className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden"
          onClick={() => document.getElementById("default-modal").classList.remove("hidden")}
        >
          <img className="object-cover object-center h-32" src={userData.avatar || "/Images/Avatars/avatar_default.jpg"} alt="Selected Avatar" />
        </div>
        <Modal onAvatarSelect={handleAvatarSelect} />
        <div className="text-center mt-2 mb-4">
          <h2 className="font-semibold">{userData.username}</h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>
        <div className="p-4 border-t mx-8 mt-2">
          <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
            Suivre
          </button>
        </div>
        <div className="p-4 border-t mx-8 mt-2 text-center">
          <a href="#" className="text-red-600 hover:underline" onClick={() => setIsDeleteModalOpen(true)}>
            Supprimer le compte
          </a>
        </div>
      </div>

      {/* Modale de confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
            <div className="flex justify-center space-x-4">
              <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded">
                Oui, supprimer
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
