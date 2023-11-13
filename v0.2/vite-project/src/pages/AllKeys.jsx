// AllKeysPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllKeys = () => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/keys");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setKeys(data);
      } catch (error) {
        console.error("Error fetching keys:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-teal-800 to-teal-500">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All Keys
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {keys.map((key) => (
            <div key={key._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-teal-300 lg:aspect-none group-hover:opacity-75 lg:h-80">
                {console.log(key.image[0])}
                <img
                  src={`/src/images/${key.image[0]}`}
                  alt={key.name}
                  className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-2xl text-gray-900">
                    <Link to={`/keys/${key._id}`}>{key.name}</Link>
                  </h3>
                  <p className="mt-1 text-m text-gray-800">
                    Price: €{key.price}
                  </p>
                  <p className="mt-1 text-m text-gray-800">
                    Limited: {key.limited} pieces
                  </p>
                  <p className="mt-1 text-m text-gray-800">Land: {key.land}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllKeys;
