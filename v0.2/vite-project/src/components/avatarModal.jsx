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
        className="hidden overflow-y-auto overflow-x-hidden fixed  transform translate-y-1/5 translate-x-1/2 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Choisissez votre avatar
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

            <div className="grid grid-cols-7 m-5">
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
            
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="default-modal"
                onClick={handleAcceptClick}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                J&aposaccepte
              </button>
              <button
                data-modal-hide="default-modal"
                onClick={closeModal}
                type="button"
                className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
