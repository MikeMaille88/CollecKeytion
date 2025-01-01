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
            keyData.image.inBox,
            300,
            450
          )}
          // src={keyData.image.inBox}
          alt={keyData.name}
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

      {/* <div className="max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-300 ease-in-out hover:scale-105">
        <Link to={`/keys/${keyData._id}`}>
          <div className="flex items-center justify-center">
            <img
              className="rounded-lg"
              //src={`/src/images/${keyData.image.inBox}`}
              // Affichage url cloudinary
              src={`${keyData.image.inBox}`}
              alt={keyData.name}
            />
          </div>
        </Link>
        <div className="p-5">
          <Link to={`/keys/${keyData._id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white h-[90px]">
              {keyData.name}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">
            Price: €{keyData.price}
          </p>
          <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">
            Limited: {keyData.limited} pieces
          </p>
          <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">
            Land: {keyData.land}
          </p>
          <Link to={`/keys/${keyData._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Go to Key
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div> */}

      {/* <div key={keyData._id} className="group relative">
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
      </div> */}
    </>
  );
};

export default KeyCard;
