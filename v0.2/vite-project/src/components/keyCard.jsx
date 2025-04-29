// KeyCard.jsx

import { Link } from "react-router-dom";

const transformImageUrl = (url, width, height) => {
  return url.replace(
    '/upload/',
    `/upload/f_auto,q_auto,w_${width},h_${height}/`
  );
};

const KeyCard = ({ keyData }) => {
  return (
    <>
    <Link to={`/keys/${keyData._id}`}>
      <div className="relative w-full max-w-xs p-4 transition duration-300 ease-in-out hover:scale-110">
      <div className="relative">
      <img
          className="rounded-lg shadow-lg w-full"
          src={transformImageUrl(
            keyData.image?.inBox || "https://res.cloudinary.com/colleckeytion/image/upload/v1741006301/CollecKeytion/others/key_placeholder.jpg",
            300,
            450
          )}
          // src={keyData.image.inBox}
          alt={keyData.name || "Image non disponible"}
          style={{ boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.25)" }}
        />
        {/* Overlay avec gradient et texte */}
        <div className="absolute inset-0 flex flex-col justify-end rounded-lg bg-gradient-to-t from-black via-transparent to-transparent p-4 transition duration-300 ease-in-out hover:shadow-[0px_0px_20px_6px_rgba(186,85,211,0.7)]">
          <h3 className="text-lg text-white font-albra">{keyData.name}</h3>
          <p className="text-gray-500 text-sm font-albra"><em>{keyData.land}</em></p>
        </div>
      </div>
    </div>
    </Link>
    </>
  );
};

export default KeyCard;
