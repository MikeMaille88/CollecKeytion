//avatarModal.jsx
import { useEffect, useState } from "react";

//Importe les chemins d'accès à toutes les images
const imagesFiles = import.meta.glob("../../public/Images/Avatars/*");
const imagesPaths = Object.keys(imagesFiles).map(path => path.replace('../../public', ''));

const Modal = ({ onAvatarSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    console.log("Component updated");
  }, [selectedAvatar]);

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const closeModal = () => {
    document.getElementById("default-modal").classList.add("hidden");
  };

  const handleAcceptClick = () => {
    if (selectedAvatar) {
      onAvatarSelect(selectedAvatar);
    }
    closeModal();
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-2xl mx-auto">
          <div className="relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
              <h3 className="text-xl font-semibold text-gray-200">
                Choisissez votre avatar
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 m-5">
              {imagesPaths.map((image, index) => (
                console.log(image),
                <img
                  className={`h-20 border-4 rounded-full ${
                    selectedAvatar === image ? "border-blue-600" : "border-white hover:border-blue-600"
                  }`}
                  key={index}
                  src={image}
                  alt={`image-${index}`}
                  onClick={() => handleAvatarClick(image)}
                />
              ))}
            </div>
            
            <div className="flex items-center p-4 md:p-5 rounded-b">
              <button
                data-modal-hide="default-modal"
                onClick={handleAcceptClick}
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                J&apos;accepte
              </button>
              <button
                data-modal-hide="default-modal"
                onClick={closeModal}
                type="button"
                className="ms-3 text-gray-300 bg-gray-700 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-500 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
