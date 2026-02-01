import bcrypt from "bcrypt";

// Generar mascotas mock
export const generateMockPets = (num) => {
  const pets = [];
  const species = ["dog", "cat", "bird", "rabbit", "hamster"];
  const names = [
    "Firulais",
    "Michi",
    "Rocky",
    "Luna",
    "Max",
    "Bella",
    "Coco",
    "Simba",
    "Nala",
    "Thor",
  ];

  for (let i = 0; i < num; i++) {
    const pet = {
      name: names[Math.floor(Math.random() * names.length)],
      specie: species[Math.floor(Math.random() * species.length)],
      birthDate: new Date(
        2018 + Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      ),
      adopted: false,
      owner: null,
      image: "",
    };
    pets.push(pet);
  }
  return pets;
};

// Generar usuarios mock
export const generateMockUsers = async (num) => {
  const users = [];
  const firstNames = [
    "Juan",
    "Maria",
    "Carlos",
    "Ana",
    "Pedro",
    "Laura",
    "Diego",
    "Sofia",
    "Miguel",
    "Valentina",
  ];
  const lastNames = [
    "Garcia",
    "Rodriguez",
    "Martinez",
    "Lopez",
    "Gonzalez",
    "Perez",
    "Sanchez",
    "Ramirez",
    "Torres",
    "Flores",
  ];
  const roles = ["user", "admin"];

  // Encriptar la contraseña una sola vez para todos los usuarios
  const hashedPassword = await bcrypt.hash("coder123", 10);

  for (let i = 0; i < num; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    const user = {
      first_name: firstName,
      last_name: lastName,
      email: `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}@email.com`,
      password: hashedPassword,
      role: roles[Math.floor(Math.random() * roles.length)],
      pets: [],
    };
    users.push(user);
  }
  return users;
};
