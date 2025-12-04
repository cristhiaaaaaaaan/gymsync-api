# GymSync API

Backend REST API for the GymSync mobile application.

## API URL

Production: `https://gymsync-api.onrender.com`

Local: `http://localhost:3000`

## Setup

Install dependencies:
```bash
npm install
```

Run the server:
```bash
npm start
```

## Technology

- Node.js
- Express.js
- In-memory storage

## Response Format

Success:
```json
{
  "data": { ... },
  "responseCode": 200,
  "message": "Success message"
}
```

Error:
```json
{
  "responseCode": 400,
  "message": "Error message"
}
```

## Endpoints

### GET /
API information.

Response:
```json
{
  "message": "GymSync API - Mobile App Backend",
  "version": "1.0.0",
  "endpoints": {
    "users": "/users",
    "recipes": "/recipes",
    "meals": "/meals",
    "classes": "/classes",
    "inscriptions": "/inscriptions"
  },
  "documentation": "See README.md for full API documentation"
}
```

---

## 1. Users Endpoints

### GET /users
Get all users.

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "Juan",
      "fLastName": "Pérez",
      "sLastName": "González",
      "password": "password123",
      "email": "juan@example.com"
    }
  ],
  "responseCode": 200,
  "message": "Users retrieved successfully"
}
```

### GET /users/:id
Get a specific user by ID.

**Parameters:**
- `id` (string) - User ID

**Response:**
```json
{
  "data": {
    "id": "1",
    "name": "Juan",
    "fLastName": "Pérez",
    "sLastName": "González",
    "password": "password123",
    "email": "juan@example.com"
  },
  "responseCode": 200,
  "message": "User retrieved successfully"
}
```

### POST /users
Create a new user.

**Request Body:**
```json
{
  "id": "3",
  "name": "Carlos",
  "fLastName": "Ramírez",
  "sLastName": "Torres",
  "password": "securepass",
  "email": "carlos@example.com"
}
```

**Response:**
```json
{
  "data": {
    "id": "3",
    "name": "Carlos",
    "fLastName": "Ramírez",
    "sLastName": "Torres",
    "password": "securepass",
    "email": "carlos@example.com"
  },
  "responseCode": 201,
  "message": "User created successfully"
}
```

### PUT /users/:id
Update an existing user.

**Parameters:**
- `id` (string) - User ID

**Request Body (all fields optional):**
```json
{
  "name": "Carlos Updated",
  "email": "newemail@example.com"
}
```

**Response:**
```json
{
  "data": {
    "id": "3",
    "name": "Carlos Updated",
    "fLastName": "Ramírez",
    "sLastName": "Torres",
    "password": "securepass",
    "email": "newemail@example.com"
  },
  "responseCode": 200,
  "message": "User updated successfully"
}
```

### DELETE /users/:id
Delete a user.

**Parameters:**
- `id` (string) - User ID

**Response:**
```json
{
  "data": {
    "id": "3",
    "name": "Carlos",
    "fLastName": "Ramírez",
    "sLastName": "Torres",
    "password": "securepass",
    "email": "carlos@example.com"
  },
  "responseCode": 200,
  "message": "User deleted successfully"
}
```

---

## 2. Recipes Endpoints

### GET /recipes
Get all recipes.

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "Ensalada de Pollo",
      "description": "Ensalada saludable con pechuga de pollo",
      "prepTime": 15,
      "cookTime": 10,
      "difficulty": "Fácil",
      "servings": 2,
      "category": "Saludable",
      "steps": "1. Cocinar el pollo. 2. Cortar verduras. 3. Mezclar todo.",
      "ingredients": ["Pollo 200g", "Lechuga", "Tomate", "Aceite de oliva"]
    }
  ],
  "responseCode": 200,
  "message": "Recipes retrieved successfully"
}
```

### GET /recipes/:id
Get a specific recipe by ID.

**Parameters:**
- `id` (string) - Recipe ID

**Response:**
```json
{
  "data": {
    "id": "1",
    "name": "Ensalada de Pollo",
    "description": "Ensalada saludable con pechuga de pollo",
    "prepTime": 15,
    "cookTime": 10,
    "difficulty": "Fácil",
    "servings": 2,
    "category": "Saludable",
    "steps": "1. Cocinar el pollo. 2. Cortar verduras. 3. Mezclar todo.",
    "ingredients": ["Pollo 200g", "Lechuga", "Tomate", "Aceite de oliva"]
  },
  "responseCode": 200,
  "message": "Recipe retrieved successfully"
}
```

### POST /recipes
Create a new recipe.

**Request Body:**
```json
{
  "id": "3",
  "name": "Smoothie Verde",
  "description": "Batido nutritivo",
  "prepTime": 5,
  "cookTime": 0,
  "difficulty": "Muy Fácil",
  "servings": 1,
  "category": "Bebida",
  "steps": "1. Mezclar todo en licuadora.",
  "ingredients": ["Espinaca", "Plátano", "Agua"]
}
```

**Response:**
```json
{
  "data": {
    "id": "3",
    "name": "Smoothie Verde",
    "description": "Batido nutritivo",
    "prepTime": 5,
    "cookTime": 0,
    "difficulty": "Muy Fácil",
    "servings": 1,
    "category": "Bebida",
    "steps": "1. Mezclar todo en licuadora.",
    "ingredients": ["Espinaca", "Plátano", "Agua"]
  },
  "responseCode": 201,
  "message": "Recipe created successfully"
}
```

### PUT /recipes/:id
Update an existing recipe.

**Parameters:**
- `id` (string) - Recipe ID

**Request Body (all fields optional):**
```json
{
  "name": "Smoothie Verde Mejorado",
  "servings": 2
}
```

**Response:**
```json
{
  "data": {
    "id": "3",
    "name": "Smoothie Verde Mejorado",
    "description": "Batido nutritivo",
    "prepTime": 5,
    "cookTime": 0,
    "difficulty": "Muy Fácil",
    "servings": 2,
    "category": "Bebida",
    "steps": "1. Mezclar todo en licuadora.",
    "ingredients": ["Espinaca", "Plátano", "Agua"]
  },
  "responseCode": 200,
  "message": "Recipe updated successfully"
}
```

### DELETE /recipes/:id
Delete a recipe.

**Parameters:**
- `id` (string) - Recipe ID

**Response:**
```json
{
  "data": {
    "id": "3",
    "name": "Smoothie Verde",
    "description": "Batido nutritivo",
    "prepTime": 5,
    "cookTime": 0,
    "difficulty": "Muy Fácil",
    "servings": 1,
    "category": "Bebida",
    "steps": "1. Mezclar todo en licuadora.",
    "ingredients": ["Espinaca", "Plátano", "Agua"]
  },
  "responseCode": 200,
  "message": "Recipe deleted successfully"
}
```

---

## 3. Meals Endpoints

### GET /meals
Get all meals.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Desayuno Proteico",
      "quantity": 1,
      "deliveryDate": "05/12/2025",
      "notes": "Con frutas"
    }
  ],
  "responseCode": 200,
  "message": "Meals retrieved successfully"
}
```

### GET /meals/:id
Get a specific meal by ID.

**Parameters:**
- `id` (number) - Meal ID

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "Desayuno Proteico",
    "quantity": 1,
    "deliveryDate": "05/12/2025",
    "notes": "Con frutas"
  },
  "responseCode": 200,
  "message": "Meal retrieved successfully"
}
```

### POST /meals
Create a new meal.

**Request Body:**
```json
{
  "id": 3,
  "name": "Cena Ligera",
  "quantity": 1,
  "deliveryDate": "06/12/2025",
  "notes": "Sin sal"
}
```

**Response:**
```json
{
  "data": {
    "id": 3,
    "name": "Cena Ligera",
    "quantity": 1,
    "deliveryDate": "06/12/2025",
    "notes": "Sin sal"
  },
  "responseCode": 201,
  "message": "Meal created successfully"
}
```

### PUT /meals/:id
Update an existing meal.

**Parameters:**
- `id` (number) - Meal ID

**Request Body (all fields optional):**
```json
{
  "quantity": 2,
  "notes": "Con ensalada extra"
}
```

**Response:**
```json
{
  "data": {
    "id": 3,
    "name": "Cena Ligera",
    "quantity": 2,
    "deliveryDate": "06/12/2025",
    "notes": "Con ensalada extra"
  },
  "responseCode": 200,
  "message": "Meal updated successfully"
}
```

### DELETE /meals/:id
Delete a meal.

**Parameters:**
- `id` (number) - Meal ID

**Response:**
```json
{
  "data": {
    "id": 3,
    "name": "Cena Ligera",
    "quantity": 2,
    "deliveryDate": "06/12/2025",
    "notes": "Con ensalada extra"
  },
  "responseCode": 200,
  "message": "Meal deleted successfully"
}
```

---

## 4. Classes Endpoints

### GET /classes
Get all gym classes.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Yoga Matutino",
      "schedule": "Lunes 7:00 AM",
      "professor": "Ana García"
    }
  ],
  "responseCode": 200,
  "message": "Classes retrieved successfully"
}
```

### GET /classes/:id
Get a specific class by ID.

**Parameters:**
- `id` (number) - Class ID

**Response:**
```json
{
  "data": {
    "id": 1,
    "title": "Yoga Matutino",
    "schedule": "Lunes 7:00 AM",
    "professor": "Ana García"
  },
  "responseCode": 200,
  "message": "Class retrieved successfully"
}
```

### POST /classes
Create a new class.

**Request Body:**
```json
{
  "id": 4,
  "title": "Pilates",
  "schedule": "Jueves 8:00 AM",
  "professor": "Roberto Sánchez"
}
```

**Response:**
```json
{
  "data": {
    "id": 4,
    "title": "Pilates",
    "schedule": "Jueves 8:00 AM",
    "professor": "Roberto Sánchez"
  },
  "responseCode": 201,
  "message": "Class created successfully"
}
```

### PUT /classes/:id
Update an existing class.

**Parameters:**
- `id` (number) - Class ID

**Request Body (all fields optional):**
```json
{
  "schedule": "Jueves 9:00 AM",
  "professor": "María López"
}
```

**Response:**
```json
{
  "data": {
    "id": 4,
    "title": "Pilates",
    "schedule": "Jueves 9:00 AM",
    "professor": "María López"
  },
  "responseCode": 200,
  "message": "Class updated successfully"
}
```

### DELETE /classes/:id
Delete a class.

**Parameters:**
- `id` (number) - Class ID

**Response:**
```json
{
  "data": {
    "id": 4,
    "title": "Pilates",
    "schedule": "Jueves 9:00 AM",
    "professor": "María López"
  },
  "responseCode": 200,
  "message": "Class deleted successfully"
}
```

---

## 5. Inscriptions Endpoints

### GET /inscriptions
Get all inscriptions.

**Response:**
```json
{
  "data": [
    {
      "inscriptionId": "1",
      "personId": "1",
      "personEmail": "juan@example.com",
      "courseName": "Fitness Básico",
      "trainingName": "CrossFit",
      "schedule": "Martes 6:00 PM"
    }
  ],
  "responseCode": 200,
  "message": "Inscriptions retrieved successfully"
}
```

### GET /inscriptions/:id
Get a specific inscription by ID.

**Parameters:**
- `id` (string) - Inscription ID

**Response:**
```json
{
  "data": {
    "inscriptionId": "1",
    "personId": "1",
    "personEmail": "juan@example.com",
    "courseName": "Fitness Básico",
    "trainingName": "CrossFit",
    "schedule": "Martes 6:00 PM"
  },
  "responseCode": 200,
  "message": "Inscription retrieved successfully"
}
```

### GET /inscriptions/person/:personId
Get all inscriptions for a specific person.

**Parameters:**
- `personId` (string) - Person ID

**Response:**
```json
{
  "data": [
    {
      "inscriptionId": "1",
      "personId": "1",
      "personEmail": "juan@example.com",
      "courseName": "Fitness Básico",
      "trainingName": "CrossFit",
      "schedule": "Martes 6:00 PM"
    }
  ],
  "responseCode": 200,
  "message": "Inscriptions retrieved successfully"
}
```

### POST /inscriptions
Create a new inscription.

**Request Body:**
```json
{
  "inscriptionId": "3",
  "personId": "3",
  "personEmail": "carlos@example.com",
  "courseName": "Wellness",
  "trainingName": "Yoga Matutino",
  "schedule": "Lunes 7:00 AM"
}
```

**Response:**
```json
{
  "data": {
    "inscriptionId": "3",
    "personId": "3",
    "personEmail": "carlos@example.com",
    "courseName": "Wellness",
    "trainingName": "Yoga Matutino",
    "schedule": "Lunes 7:00 AM"
  },
  "responseCode": 201,
  "message": "Inscription created successfully"
}
```

### PUT /inscriptions/:id
Update an existing inscription.

**Parameters:**
- `id` (string) - Inscription ID

**Request Body (all fields optional):**
```json
{
  "courseName": "Fitness Avanzado",
  "schedule": "Lunes 8:00 AM"
}
```

**Response:**
```json
{
  "data": {
    "inscriptionId": "3",
    "personId": "3",
    "personEmail": "carlos@example.com",
    "courseName": "Fitness Avanzado",
    "trainingName": "Yoga Matutino",
    "schedule": "Lunes 8:00 AM"
  },
  "responseCode": 200,
  "message": "Inscription updated successfully"
}
```

### DELETE /inscriptions/:id
Delete an inscription.

**Parameters:**
- `id` (string) - Inscription ID

**Response:**
```json
{
  "data": {
    "inscriptionId": "3",
    "personId": "3",
    "personEmail": "carlos@example.com",
    "courseName": "Fitness Avanzado",
    "trainingName": "Yoga Matutino",
    "schedule": "Lunes 8:00 AM"
  },
  "responseCode": 200,
  "message": "Inscription deleted successfully"
}
```

---

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Testing with Postman

1. Import the collection or create requests manually
2. Set the base URL to `http://localhost:3000` (local) or the deployed URL
3. For POST and PUT requests, set the header: `Content-Type: application/json`
4. Use the JSON examples provided above for request bodies

## Notes

- This API uses in-memory storage. All data will be reset when the server restarts.
- CORS is enabled for all origins.
- All dates use the format `dd/MM/yyyy`.
- IDs for Users, Recipes, and Inscriptions are strings. IDs for Meals and Classes are numbers.

## License

ISC
