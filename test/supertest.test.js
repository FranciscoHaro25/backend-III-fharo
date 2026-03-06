import supertest from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

const requester = supertest(app);

describe("Tests del router de adopciones", function () {
  this.timeout(10000);

  let testUser;
  let testPet;
  let testAdoption;

  // creo un user y un pet para usar en los tests
  before(async function () {
    const userRes = await requester.post("/api/sessions/register").send({
      first_name: "Test",
      last_name: "Adoption",
      email: `testadoption${Date.now()}@test.com`,
      password: "test1234",
    });

    const usersRes = await requester.get("/api/users");
    const users = usersRes.body.payload;
    testUser = users[users.length - 1];

    const petRes = await requester.post("/api/pets").send({
      name: "TestPet",
      specie: "dog",
      birthDate: "2022-01-15",
    });
    testPet = petRes.body.payload;
  });

  // borro lo que cree para los tests
  after(async function () {
    if (testUser) {
      await requester.delete(`/api/users/${testUser._id}`);
    }
    if (testPet) {
      await requester.delete(`/api/pets/${testPet._id}`);
    }
  });

  describe("GET /api/adoptions", () => {
    it("trae todas las adopciones", async () => {
      const res = await requester.get("/api/adoptions");

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal("success");
      expect(res.body.payload).to.be.an("array");
    });
  });

  describe("GET /api/adoptions/:aid", () => {
    it("devuelve 404 si no existe la adopcion", async () => {
      const fakeId = "644bcc7f001234abcd567890";
      const res = await requester.get(`/api/adoptions/${fakeId}`);

      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal("error");
      expect(res.body.error).to.equal("Adoption not found");
    });

    it("trae una adopcion por id", async () => {
      // creo una adopcion primero
      const adoptionRes = await requester.post(
        `/api/adoptions/${testUser._id}/${testPet._id}`,
      );

      const allAdoptions = await requester.get("/api/adoptions");
      testAdoption =
        allAdoptions.body.payload[allAdoptions.body.payload.length - 1];

      const res = await requester.get(`/api/adoptions/${testAdoption._id}`);

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal("success");
      expect(res.body.payload).to.have.property("_id");
      expect(res.body.payload).to.have.property("owner");
      expect(res.body.payload).to.have.property("pet");
    });
  });

  describe("POST /api/adoptions/:uid/:pid", () => {
    it("da 404 si el usuario no existe", async () => {
      const fakeUserId = "644bcc7f001234abcd567890";
      const res = await requester.post(
        `/api/adoptions/${fakeUserId}/${testPet._id}`,
      );

      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal("error");
      expect(res.body.error).to.equal("user Not found");
    });

    it("da 404 si la mascota no existe", async () => {
      const fakePetId = "644bcc7f001234abcd567890";
      const res = await requester.post(
        `/api/adoptions/${testUser._id}/${fakePetId}`,
      );

      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal("error");
      expect(res.body.error).to.equal("Pet not found");
    });

    it("da 400 si la mascota ya esta adoptada", async () => {
      // testPet ya se adopto arriba
      const res = await requester.post(
        `/api/adoptions/${testUser._id}/${testPet._id}`,
      );

      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal("error");
      expect(res.body.error).to.equal("Pet is already adopted");
    });

    it("crea una adopcion bien", async () => {
      // necesito otra mascota porque la anterior ya esta adoptada
      const newPetRes = await requester.post("/api/pets").send({
        name: "Firulais",
        specie: "cat",
        birthDate: "2023-06-10",
      });
      const newPet = newPetRes.body.payload;

      const res = await requester.post(
        `/api/adoptions/${testUser._id}/${newPet._id}`,
      );

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal("success");
      expect(res.body.message).to.equal("Pet adopted");

      await requester.delete(`/api/pets/${newPet._id}`);
    });
  });
});
