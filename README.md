# Adoptme - Backend

## Entrega N°1 - Módulo de Mocking

**Alumno:** Francisco Haro  
**Comisión:** 85610  
**Curso:** Backend III: Testing y Escalabilidad Backend

---

### Descripción del proyecto

Este proyecto es una API REST para un sistema de adopción de mascotas. En esta primera entrega se implementó el módulo de Mocking para generar datos de prueba.

### Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- bcrypt (encriptación de contraseñas)
- JWT (autenticación)
- Multer (subida de archivos)

### Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto (ver `.env.example`):

```
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/adoptme
PORT=8080
JWT_SECRET=tu_secreto_jwt
```

4. Iniciar el servidor:

```bash
npm start
```

El servidor corre en `http://localhost:8080`

---

### Endpoints de Mocking (Entrega N°1)

#### GET /api/mocks/mockingpets

Genera mascotas de prueba sin guardarlas en la base de datos.

```bash
# Ejemplo - genera 10 mascotas
GET http://localhost:8080/api/mocks/mockingpets?num=10
```

#### GET /api/mocks/mockingusers

Genera 50 usuarios de prueba con:

- Password "coder123" encriptada
- Role aleatorio (user/admin)
- Array de pets vacío

```bash
GET http://localhost:8080/api/mocks/mockingusers
```

#### POST /api/mocks/generateData

Genera e inserta usuarios y mascotas en la base de datos.

```bash
POST http://localhost:8080/api/mocks/generateData
Content-Type: application/json

{
    "users": 10,
    "pets": 20
}
```

---

### Otros endpoints disponibles

| Método | Ruta                     | Descripción                      |
| ------ | ------------------------ | -------------------------------- |
| GET    | /api/users               | Obtener todos los usuarios       |
| GET    | /api/users/:uid          | Obtener usuario por ID           |
| PUT    | /api/users/:uid          | Actualizar usuario               |
| DELETE | /api/users/:uid          | Eliminar usuario                 |
| GET    | /api/pets                | Obtener todas las mascotas       |
| POST   | /api/pets                | Crear mascota                    |
| PUT    | /api/pets/:pid           | Actualizar mascota               |
| DELETE | /api/pets/:pid           | Eliminar mascota                 |
| GET    | /api/adoptions           | Obtener adopciones               |
| GET    | /api/adoptions/:aid      | Obtener adopción por ID          |
| POST   | /api/adoptions/:uid/:pid | Crear adopción                   |
| POST   | /api/sessions/register   | Registrar usuario                |
| POST   | /api/sessions/login      | Iniciar sesión                   |
| GET    | /api/sessions/current    | Usuario actual (requiere cookie) |

---

### Estructura del proyecto

```
src/
├── controllers/        # Controladores de cada entidad
├── dao/               # Data Access Objects
│   └── models/        # Esquemas de Mongoose
├── dto/               # Data Transfer Objects
├── mocks/             # Módulo de mocking (Entrega 1)
├── public/            # Archivos estáticos
├── repository/        # Repositorios (patrón repository)
├── routes/            # Rutas de la API
├── services/          # Servicios
├── utils/             # Utilidades (bcrypt, multer, etc)
└── app.js             # Entrada de la aplicación
```

---

### Testing

Para verificar que los datos se insertaron correctamente:

```bash
# Insertar datos de prueba
curl -X POST http://localhost:8080/api/mocks/generateData -H "Content-Type: application/json" -d '{"users": 5, "pets": 5}'

# Verificar usuarios
curl http://localhost:8080/api/users

# Verificar mascotas
curl http://localhost:8080/api/pets
```
