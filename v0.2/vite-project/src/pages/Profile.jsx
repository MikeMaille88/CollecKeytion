//Profile.jsx
import React, { useEffect, useState } from "react";
import Modal from "../components/avatarModal";

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState(
    "/Images/Avatars/avatar_default.jpg"
  );

  const handleAvatarSelect = (selectedAvatar) => {
    setAvatarUrl(selectedAvatar);
  };

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
            src={avatarUrl}
            alt="Selected Avatar"
          />
          {/* Modal comes here */}
        </div>
        <Modal key="avatarModal" onAvatarSelect={handleAvatarSelect} />
        <div className="text-center mt-2 mb-4">
          <h2 className="font-semibold">Sarah Smith</h2>
          <p className="text-gray-500">Freelance Web Designer</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                John Doe
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                johndoe@example.com
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
