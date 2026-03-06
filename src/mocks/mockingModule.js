import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

// Generar mascotas mock
export const generateMockPets = (num) => {
  const pets = [];
  const species = ["dog", "cat", "bird", "rabbit", "hamster"];

  for (let i = 0; i < num; i++) {
    const pet = {
      name: faker.animal.petName(),
      specie: faker.helpers.arrayElement(species),
      birthDate: faker.date.past({ years: 5 }),
      adopted: false,
      owner: null,
      image: faker.image.url(),
    };
    pets.push(pet);
  }
  return pets;
};

// Generar usuarios mock
export const generateMockUsers = async (num) => {
  const users = [];
  const roles = ["user", "admin"];

  // Encriptar la contraseña una sola vez para todos los usuarios
  const hashedPassword = await bcrypt.hash("coder123", 10);

  for (let i = 0; i < num; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user = {
      first_name: firstName,
      last_name: lastName,
      email: faker.internet.email({ firstName, lastName }),
      password: hashedPassword,
      role: faker.helpers.arrayElement(roles),
      pets: [],
    };
    users.push(user);
  }
  return users;
};
