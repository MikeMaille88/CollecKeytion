// KeyCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const KeyCard = ({ keyData }) => {
  return (
    <div key={keyData._id} className="group relative">
      <Link to={`/keys/${keyData._id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-slate-500 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={`/src/images/${keyData.image[0]}`}
            alt={keyData.name}
            className="h-full w-full object-contain object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-2xl text-gray-900">{keyData.name}</h3>
            <p className="mt-1 text-m text-gray-800">Price: €{keyData.price}</p>
            <p className="mt-1 text-m text-gray-800">
              Limited: {keyData.limited} pieces
            </p>
            <p className="mt-1 text-m text-gray-800">Land: {keyData.land}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default KeyCard;
