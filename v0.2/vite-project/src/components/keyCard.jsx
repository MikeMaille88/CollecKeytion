import React from "react";
import { Link } from "react-router-dom";

function KeyCard({ keyData }) {
  const { _id, name, retailprice, limited, land, image } = keyData;

  return (
    <div>
      <h3>{name}</h3>
      <p>Retail Price: {retailprice}</p>
      <p>Limited Quantity: {limited}</p>
      <p>Land: {land}</p>
      <img
        src={image}
        alt={`${name} Image`}
        style={{ width: "100px", height: "100px" }}
      />
      <br />
      <Link to={`/keys/${_id}`}>View Details</Link>
    </div>
  );
}

export default KeyCard;
