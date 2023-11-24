// goBackButton.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const GoBackButton = () => {
  const goBack = () => {
    if (window.history && window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback vers une redirection vers la page d'accueil
      window.location.href = "/";
    }
  };

  return (
    <div className="fixed top-100 p-20">
      <button onClick={goBack}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-white text-3xl cursor-pointer hover:text-gray-300 transition duration-300"
        />
      </button>
    </div>
  );
};

export default GoBackButton;
