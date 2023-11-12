import React, { useEffect, useState } from "react";

function SingleKey({ match }) {
  const [key, setKey] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/keys/${match.params.id}`);
        const data = await response.json();
        setKey(data);
      } catch (error) {
        console.error("Error fetching key details:", error);
      }
    };

    fetchData();
  }, [match.params.id]);

  if (!key) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{key.name}</h2>
      <p>Land: {key.land}</p>
      {/* Ajoutez d'autres détails de la clef ici */}
    </div>
  );
}

export default SingleKey;
