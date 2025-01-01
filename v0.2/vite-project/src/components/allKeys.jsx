import { useEffect, useState } from "react";
import KeyCard from "./keyCard";

function useData(url) {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setKeys(data);
      } catch (error) {
        console.error("Error fetching keys:", error);
      }
    };

    fetchData();
  }, []);

  return keys;
}

function AllKeys() {
  const keys = useData("api/keys");

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
