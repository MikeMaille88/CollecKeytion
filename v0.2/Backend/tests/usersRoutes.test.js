const request = require("supertest");
const app = require("../server"); // Importez votre application Express
const mongoose = require("mongoose");
require("dotenv").config();


describe("Tests des endpoints User GET et POST", () => {
  afterEach(async () => {
    // Nettoyez les collections après chaque test
    await mongoose.connection.collection("users").deleteMany({});
  });

  afterAll(async () => {
    // Fermez la connexion à MongoDB une fois les tests terminés
    await mongoose.connection.close();
  });

  it("GET /users - retourne une liste d'utilisateurs", async () => {
    // Prépare des données de test
    await mongoose.connection.collection("users").insertMany([
      { username: "user1", email: "testuser1@test.com", password: "password1" },
      { username: "user2", email: "testuser2@test.com", password: "password2" },
    ]);

    const response = await request(app).get("/users");

    expect(response.status).toBe(200); // Vérifie le statut HTTP
    expect(response.body).toBeInstanceOf(Array); // Vérifie que la réponse est un tableau
    expect(response.body.length).toBe(2); // Vérifie que la liste contient 2 utilisateurs
  });

  it("GET /userspk - retourne une erreur car route inexistante", async () => {

    const response = await request(app).get("/userspk");

    expect(response.status).toBe(404); // Vérifie le statut HTTP
  });

  it("POST /users - devrait créer un nouvel utilisateur", async () => {
    const newUser = { username: "testuser", email: "testuser@test.com", password: "password123" };

    const res = await request(app).post("/users").send(newUser);

    expect(res.status).toBe(201); // Vérifie le code de statut
    expect(res.body).toHaveProperty("_id"); // Vérifie que l'ID est généré
    expect(res.body).toHaveProperty("username", "testuser"); // Vérifie le username

    // Vérifie également que l'utilisateur est dans la base de données
    const userInDb = await mongoose.connection.collection("users").findOne({ username: "testuser" });
    expect(userInDb).not.toBeNull();
    expect(userInDb).toMatchObject({ username: "testuser" });
  });

  it("POST /users - devrait retourner une erreur si des champs sont manquants", async () => {
    const invalidUser = { username: "incomplete" }; // Mot de passe manquant

    const res = await request(app).post("/users").send(invalidUser);

    expect(res.status).toBe(400); // Vérifie le code de statut
    expect(res.body).toHaveProperty("errors"); // Vérifie que l'erreur est retournée
    expect(res.body.errors).toBeInstanceOf(Array); // Vérifie que "errors" est un tableau
  });
});


describe("Tests des endpoints User (PATCH et DELETE)", () => {
  let userId; // ID de l'utilisateur à utiliser pour les tests PATCH et DELETE

  beforeEach(async () => {
    // Connectez-vous à la base de données de test avant les tests
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "test",
    });

    // Supprime tout utilisateur existant avec le même username pour éviter le conflit
    await mongoose.connection.collection("users").deleteMany({ username: "patchuser" });

    // Insérez un utilisateur de test
    const user = await mongoose.connection.collection("users").insertOne({
      username: "patchuser",
      email: "patchuser@test.com",
      password: "password123",
    });

    userId = user.insertedId; // Stocke l'ID pour les tests PATCH et DELETE
  });

  afterAll(async () => {
    // Supprime les utilisateurs et ferme la connexion à MongoDB une fois les tests terminés
    await mongoose.connection.collection("users").deleteMany({});
    await mongoose.connection.close();
  });

  it("PATCH /users/:id - devrait mettre à jour les informations d'un utilisateur", async () => {
    const updatedData = { email: "updateduser@test.com" };

    const res = await request(app).patch(`/users/${userId}`).send(updatedData);

    expect(res.status).toBe(200); // Vérifie le code de statut
    expect(res.body).toHaveProperty("message", "User modified"); // Vérifie le message
    expect(res.body.updatedUser).toHaveProperty("email", "updateduser@test.com"); // Vérifie l'email mis à jour

    // Vérifiez dans la base de données
    const userInDb = await mongoose.connection
      .collection("users")
      .findOne({ _id: userId });
    expect(userInDb.email).toBe("updateduser@test.com");
  });

  it("DELETE /users/:id - devrait supprimer un utilisateur", async () => {
    const res = await request(app).delete(`/users/${userId}`);

    expect(res.status).toBe(200); // Vérifie le code de statut
    expect(res.body).toHaveProperty("message", "User deleted"); // Vérifie le message

    // Vérifiez que l'utilisateur n'existe plus dans la base de données
    const userInDb = await mongoose.connection
      .collection("users")
      .findOne({ _id: userId });
    expect(userInDb).toBeNull();
  });
});
