# Adoptme - Backend III

**Francisco Haro** - Comision 85610

Proyecto final del curso Backend III en Coderhouse.

## Que incluye esta entrega

- Documentacion Swagger del modulo Users (`/apidocs`)
- Tests funcionales del router de adoptions con Mocha + Chai + Supertest
- Dockerfile del proyecto
- Imagen subida a DockerHub

## Link a DockerHub

https://hub.docker.com/r/franmotion/adoptme-backend

```
docker pull franmotion/adoptme-backend
```

## Como correr el proyecto

### Local

```bash
npm install
```

Crear un `.env` con:

```
MONGO_URL=mongodb+srv://tu_usuario:tu_pass@cluster.mongodb.net/adoptme
PORT=8080
JWT_SECRET=tokenSecretJWT
```

```bash
npm start
```

### Con Docker

Construir imagen:

```bash
docker build -t adoptme-backend .
```

Correr contenedor:

```bash
docker run -p 8080:8080 -e MONGO_URL=tu_mongo_url -e JWT_SECRET=tokenSecretJWT adoptme-backend
```

O directamente desde DockerHub:

```bash
docker pull franmotion/adoptme-backend
docker run -p 8080:8080 -e MONGO_URL=tu_mongo_url -e JWT_SECRET=tokenSecretJWT franmotion/adoptme-backend
```

La app queda en `http://localhost:8080`

## Swagger

Entrar a `http://localhost:8080/apidocs` para ver la documentacion de Users.

## Tests

```bash
npm test
```

Corre los tests del router de adoptions:

- GET /api/adoptions - trae todas
- GET /api/adoptions/:aid - busca por id, devuelve 404 si no existe
- POST /api/adoptions/:uid/:pid - crea adopcion, valida que existan user y pet, y que la mascota no este adoptada

## Endpoints principales

| Metodo | Ruta                     | Descripcion               |
| ------ | ------------------------ | ------------------------- |
| GET    | /api/users               | Todos los usuarios        |
| GET    | /api/users/:uid          | Usuario por id            |
| PUT    | /api/users/:uid          | Actualizar usuario        |
| DELETE | /api/users/:uid          | Eliminar usuario          |
| GET    | /api/pets                | Todas las mascotas        |
| POST   | /api/pets                | Crear mascota             |
| PUT    | /api/pets/:pid           | Actualizar mascota        |
| DELETE | /api/pets/:pid           | Eliminar mascota          |
| GET    | /api/adoptions           | Todas las adopciones      |
| GET    | /api/adoptions/:aid      | Adopcion por id           |
| POST   | /api/adoptions/:uid/:pid | Crear adopcion            |
| POST   | /api/sessions/register   | Registro                  |
| POST   | /api/sessions/login      | Login                     |
| GET    | /api/sessions/current    | Sesion actual             |
| GET    | /api/mocks/mockingpets   | Mascotas mock             |
| GET    | /api/mocks/mockingusers  | Usuarios mock             |
| POST   | /api/mocks/generateData  | Insertar datos mock en BD |
