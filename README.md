# Task Manager API

A RESTful API for managing tasks built with Node.js, Express, and MongoDB.

## Features

- Create, read, update, and delete tasks
- Task status tracking
- Simple and intuitive API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory and add:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=3000
```
4. Start the server:
```bash
npm start
```

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/v1/tasks | Get all tasks |
| POST   | /api/v1/tasks | Create a new task |
| GET    | /api/v1/tasks/:id | Get a single task |
| PATCH  | /api/v1/tasks/:id | Update a task |
| DELETE | /api/v1/tasks/:id | Delete a task |

### Request & Response Examples

#### Create Task
```json
POST /api/v1/tasks
{
  "name": "Complete project",
  "completed": false
}
```

#### Update Task
```json
PATCH /api/v1/tasks/:id
{
  "name": "Complete project",
  "completed": true
}
```

## Error Handling

The API uses conventional HTTP response codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error