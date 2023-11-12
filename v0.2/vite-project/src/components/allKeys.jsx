import React, { useEffect, useState } from "react";
import KeyCard from "./keyCard";

function AllKeys() {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/keys");
        const data = await response.json();
        setKeys(data);
      } catch (error) {
        console.error("Error fetching keys:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>All Keys</h2>
      <div className="key-list">
        {keys.map((key) => (
          <KeyCard key={key._id} keyData={key} />
        ))}
      </div>
    </div>
  );
}

export default AllKeys;
