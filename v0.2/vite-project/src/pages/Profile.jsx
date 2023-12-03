//Profile.jsx
import React, { useEffect, useState } from "react";
import Modal from "../components/avatarModal";

const Profile = () => {
  const userId = localStorage.getItem("authId");

  const [userData, setUserData] = useState({
    avatar: "/Images/Avatars/avatar_default.jpg",
  });

  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState("");

  const handleAvatarSelect = (selectedAvatar) => {
    setSelectedAvatarUrl(selectedAvatar);
  };

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3005/users/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur",
          error
        );
      }
    };

    if (userId) {
      fetchUserData(userId);
    }
  }, [userId, selectedAvatarUrl]);

  useEffect(() => {
    const updateAvatarInDatabase = async (userId, avatarUrl) => {
      try {
        const response = await fetch(`http://localhost:3005/users/${userId}`, {
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

  return (
    <div className="bg-slate-700 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto -mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="/Images/castlebynight.jpg"
            alt="Castle By Night"
          />
        </div>
        <div
          className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden"
          onClick={() =>
            document.getElementById("default-modal").classList.remove("hidden")
          }
        >
          <img
            className="object-cover object-center h-32"
            src={userData.avatar || "/Images/Avatars/avatar_default.jpg"}
            alt="Selected Avatar"
          />
          {/* Modal comes here */}
        </div>
        <Modal onAvatarSelect={handleAvatarSelect} />
        <div className="text-center mt-2 mb-4">
          <h2 className="font-semibold">{userData.username}</h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userData.username}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userData.email}
              </dd>
            </div>
          </dl>
        </div>
        <div className="p-4 border-t mx-8 mt-2">
          <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
