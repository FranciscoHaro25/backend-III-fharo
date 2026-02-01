import { Router } from "express";
import { generateMockPets, generateMockUsers } from "../mocks/mockingModule.js";
import { usersService, petsService } from "../services/index.js";

const router = Router();

// GET /api/mocks/mockingpets - Genera mascotas mock
router.get("/mockingpets", (req, res) => {
  const { num = 100 } = req.query;
  const pets = generateMockPets(parseInt(num));
  res.send({ status: "success", payload: pets });
});

// GET /api/mocks/mockingusers - Genera 50 usuarios mock
router.get("/mockingusers", async (req, res) => {
  try {
    const users = await generateMockUsers(50);
    res.send({ status: "success", payload: users });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// POST /api/mocks/generateData - Genera e inserta usuarios y mascotas en la BD
router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    // Validar que sean numeros
    if (isNaN(users) || isNaN(pets)) {
      return res
        .status(400)
        .send({ status: "error", error: "users y pets deben ser numeros" });
    }

    const results = {
      usersInserted: 0,
      petsInserted: 0,
    };

    // Generar e insertar usuarios
    if (users > 0) {
      const mockUsers = await generateMockUsers(parseInt(users));
      for (const user of mockUsers) {
        await usersService.create(user);
      }
      results.usersInserted = users;
    }

    // Generar e insertar mascotas
    if (pets > 0) {
      const mockPets = generateMockPets(parseInt(pets));
      for (const pet of mockPets) {
        await petsService.create(pet);
      }
      results.petsInserted = pets;
    }

    res.send({
      status: "success",
      message: "Datos generados correctamente",
      payload: results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;
