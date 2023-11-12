import React, { useEffect, useState } from "react";
import KeyCard from "./keyCard";

function MyKeys() {
  const [userKeys, setUserKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/userkeys");
        const data = await response.json();
        setUserKeys(data);
      } catch (error) {
        console.error("Error fetching user keys:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>My Keys</h2>
      <div className="key-list">
        {userKeys.map((userKey) => (
          <KeyCard key={userKey.keyId._id} keyData={userKey.keyId} />
        ))}
      </div>
    </div>
  );
}

export default MyKeys;
