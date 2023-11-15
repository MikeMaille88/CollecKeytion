// AllKeys.jsx page
import React, { useState, useEffect } from "react";
import KeyCard from "../components/keyCard";

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
            <KeyCard key={key._id} keyData={key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllKeys;
