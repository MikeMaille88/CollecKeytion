import React, { useState } from "react";

function CreateKey() {
  const [formData, setFormData] = useState({
    name: "",
    retailprice: 0,
    limited: 0,
    land: "",
    image: "", // chemin de l'image
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Key created:", await response.json());
    } catch (error) {
      console.error("Error creating key:", error);
    }
  };

  return (
    <div>
      <h2>Create Key</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <br />
        <label>
          Retail Price:
          <input type="number" name="retailprice" onChange={handleChange} />
        </label>
        <br />
        <label>
          Limited Quantity:
          <input type="number" name="limited" onChange={handleChange} />
        </label>
        <br />
        <label>
          Land:
          <input type="text" name="land" onChange={handleChange} />
        </label>
        <br />
        <label>
          Image Path:
          <input type="text" name="image" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Key</button>
      </form>
    </div>
  );
}

export default CreateKey;
