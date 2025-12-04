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
  "version": "2.0.0",
  "endpoints": {
    "ejercicios": "/ejercicios",
    "rutinas": "/rutinas",
    "membresias": "/membresias"
  },
  "documentation": "See README.md for full API documentation"
}
```

---

## 1. Ejercicios Endpoints

### GET /ejercicios
Get all exercises.

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "nombre": "Press de Banca",
      "series": 4,
      "repeticiones": 10,
      "pesoRecomendado": 60,
      "notas": "Mantener espalda pegada al banco"
    }
  ],
  "responseCode": 200,
  "message": "Ejercicios retrieved successfully"
}
```

### GET /ejercicios/:id
Get a specific exercise by ID.

**Parameters:**
- `id` (string) - Exercise ID

**Response:**
```json
{
  "data": {
    "id": "1",
    "nombre": "Press de Banca",
    "series": 4,
    "repeticiones": 10,
    "pesoRecomendado": 60,
    "notas": "Mantener espalda pegada al banco"
  },
  "responseCode": 200,
  "message": "Ejercicio retrieved successfully"
}
```

### POST /ejercicios
Create a new exercise.

**Request Body:**
```json
{
  "id": "4",
  "nombre": "Curl de Biceps",
  "series": 3,
  "repeticiones": 12,
  "pesoRecomendado": 15,
  "notas": "Evitar balancear el cuerpo"
}
```

**Response:**
```json
{
  "data": {
    "id": "4",
    "nombre": "Curl de Biceps",
    "series": 3,
    "repeticiones": 12,
    "pesoRecomendado": 15,
    "notas": "Evitar balancear el cuerpo"
  },
  "responseCode": 201,
  "message": "Ejercicio created successfully"
}
```

### PUT /ejercicios/:id
Update an existing exercise.

**Parameters:**
- `id` (string) - Exercise ID

**Request Body (all fields optional):**
```json
{
  "series": 4,
  "repeticiones": 15,
  "pesoRecomendado": 20
}
```

**Response:**
```json
{
  "data": {
    "id": "4",
    "nombre": "Curl de Biceps",
    "series": 4,
    "repeticiones": 15,
    "pesoRecomendado": 20,
    "notas": "Evitar balancear el cuerpo"
  },
  "responseCode": 200,
  "message": "Ejercicio updated successfully"
}
```

### DELETE /ejercicios/:id
Delete an exercise.

**Parameters:**
- `id` (string) - Exercise ID

**Response:**
```json
{
  "data": {
    "id": "4",
    "nombre": "Curl de Biceps",
    "series": 4,
    "repeticiones": 15,
    "pesoRecomendado": 20,
    "notas": "Evitar balancear el cuerpo"
  },
  "responseCode": 200,
  "message": "Ejercicio deleted successfully"
}
```

---

## 2. Rutinas Endpoints

### GET /rutinas
Get all workout routines.

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "usuarioId": "user1",
      "fecha": "2025-12-04T04:35:05.055Z",
      "nombre": "Rutina Pecho y Triceps",
      "ejercicios": ["1", "2"],
      "completada": false
    }
  ],
  "responseCode": 200,
  "message": "Rutinas retrieved successfully"
}
```

### GET /rutinas/:id
Get a specific routine by ID.

**Parameters:**
- `id` (string) - Routine ID

**Response:**
```json
{
  "data": {
    "id": "1",
    "usuarioId": "user1",
    "fecha": "2025-12-04T04:35:05.055Z",
    "nombre": "Rutina Pecho y Triceps",
    "ejercicios": ["1", "2"],
    "completada": false
  },
  "responseCode": 200,
  "message": "Rutina retrieved successfully"
}
```

### POST /rutinas
Create a new routine.

**Request Body:**
```json
{
  "id": "3",
  "usuarioId": "user2",
  "fecha": "2025-12-04T10:00:00.000Z",
  "nombre": "Rutina Espalda",
  "ejercicios": ["3"],
  "completada": false
}
```

**Response:**
```json
{
  "data": {
    "id": "3",
    "usuarioId": "user2",
    "fecha": "2025-12-04T10:00:00.000Z",
    "nombre": "Rutina Espalda",
    "ejercicios": ["3"],
    "completada": false
  },
  "responseCode": 201,
  "message": "Rutina created successfully"
}
```

### PUT /rutinas/:id
Update an existing routine.

**Parameters:**
- `id` (string) - Routine ID

**Request Body (all fields optional):**
```json
{
  "completada": true,
  "nombre": "Rutina Espalda y Biceps"
}
```

**Response:**
```json
{
  "data": {
    "id": "3",
    "usuarioId": "user2",
    "fecha": "2025-12-04T10:00:00.000Z",
    "nombre": "Rutina Espalda y Biceps",
    "ejercicios": ["3"],
    "completada": true
  },
  "responseCode": 200,
  "message": "Rutina updated successfully"
}
```

### DELETE /rutinas/:id
Delete a routine.

**Parameters:**
- `id` (string) - Routine ID

**Response:**
```json
{
  "data": {
    "id": "3",
    "usuarioId": "user2",
    "fecha": "2025-12-04T10:00:00.000Z",
    "nombre": "Rutina Espalda y Biceps",
    "ejercicios": ["3"],
    "completada": true
  },
  "responseCode": 200,
  "message": "Rutina deleted successfully"
}
```

---

## 3. Membresias Endpoints

### GET /membresias
Get all memberships.

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "usuarioId": "user1",
      "tipo": "Premium",
      "fechaInicio": "2025-12-04T04:35:05.060Z",
      "fechaVencimiento": "2026-01-04T04:35:05.060Z",
      "activa": true,
      "monto": 50
    }
  ],
  "responseCode": 200,
  "message": "Membresias retrieved successfully"
}
```

### GET /membresias/:id
Get a specific membership by ID.

**Parameters:**
- `id` (string) - Membership ID

**Response:**
```json
{
  "data": {
    "id": "1",
    "usuarioId": "user1",
    "tipo": "Premium",
    "fechaInicio": "2025-12-04T04:35:05.060Z",
    "fechaVencimiento": "2026-01-04T04:35:05.060Z",
    "activa": true,
    "monto": 50
  },
  "responseCode": 200,
  "message": "Membresia retrieved successfully"
}
```

### POST /membresias
Create a new membership.

**Request Body:**
```json
{
  "id": "3",
  "usuarioId": "user3",
  "tipo": "VIP",
  "fechaInicio": "2025-12-04T10:00:00.000Z",
  "fechaVencimiento": "2026-03-04T10:00:00.000Z",
  "activa": true,
  "monto": 100
}
```

**Response:**
```json
{
  "data": {
    "id": "3",
    "usuarioId": "user3",
    "tipo": "VIP",
    "fechaInicio": "2025-12-04T10:00:00.000Z",
    "fechaVencimiento": "2026-03-04T10:00:00.000Z",
    "activa": true,
    "monto": 100
  },
  "responseCode": 201,
  "message": "Membresia created successfully"
}
```

### PUT /membresias/:id
Update an existing membership.

**Parameters:**
- `id` (string) - Membership ID

**Request Body (all fields optional):**
```json
{
  "activa": false,
  "fechaVencimiento": "2026-06-04T10:00:00.000Z"
}
```

**Response:**
```json
{
  "data": {
    "id": "3",
    "usuarioId": "user3",
    "tipo": "VIP",
    "fechaInicio": "2025-12-04T10:00:00.000Z",
    "fechaVencimiento": "2026-06-04T10:00:00.000Z",
    "activa": false,
    "monto": 100
  },
  "responseCode": 200,
  "message": "Membresia updated successfully"
}
```

### DELETE /membresias/:id
Delete a membership.

**Parameters:**
- `id` (string) - Membership ID

**Response:**
```json
{
  "data": {
    "id": "3",
    "usuarioId": "user3",
    "tipo": "VIP",
    "fechaInicio": "2025-12-04T10:00:00.000Z",
    "fechaVencimiento": "2026-06-04T10:00:00.000Z",
    "activa": false,
    "monto": 100
  },
  "responseCode": 200,
  "message": "Membresia deleted successfully"
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
2. Set the base URL to `http://localhost:3000` (local) or `https://gymsync-api.onrender.com` (production)
3. For POST and PUT requests, set the header: `Content-Type: application/json`
4. Use the JSON examples provided above for request bodies

## Notes

- This API uses in-memory storage. All data will be reset when the server restarts.
- CORS is enabled for all origins.
- All IDs are strings.
- Dates are stored as ISO 8601 format.

## License

ISC
