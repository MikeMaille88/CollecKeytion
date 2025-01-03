const request = require("supertest");
const app = require("../server");  // Assurez-vous que le chemin est correct

// Votre test
test("GET /users - retourne une liste d'utilisateurs", async () => {
  const response = await request(app).get("/users");
  expect(response.statusCode).toBe(200);

  // Utilisateurs attendus
  const expectedUsers = [
    { _id: "65561b597c58d55ea810cf5c", username: "MikeMaille" },
    { _id: "6566f9fe77837f06b879d399", username: "ghisou" },
  ];

  const actualUsers = response.body.map(user => ({
    _id: user._id,
    username: user.username,
  }));

  expectedUsers.forEach(expectedUser => {
    expect(actualUsers).toContainEqual(expectedUser);
  });
});

// Hook afterAll pour fermer la connexion MongoDB après tous les tests
afterAll(async () => {
  const mongoose = require("mongoose");
  await mongoose.connection.close();
});
