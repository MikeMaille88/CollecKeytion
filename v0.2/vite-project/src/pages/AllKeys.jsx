// AllKeysPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllKeys = () => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    // Effectuez une requête pour récupérer toutes les clés depuis votre backend
    // Utilisez fetch ou axios pour cela
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
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Ajoutez d'autres liens de navigation au besoin */}
        </ul>
      </nav>
      <h2>All Keys</h2>
      <div>
        {keys.map((key) => (
          <div key={key._id} className="key-card">
            <img
              src={`http://localhost:3005/images/${key.image}`}
              alt={key.name}
            />
            <p>Name: {key.name}</p>
            <p>Price: {key.price}</p>
            <p>Limited: {key.limited}</p>
            <p>Land: {key.land}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllKeys;
