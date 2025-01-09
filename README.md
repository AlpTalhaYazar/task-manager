# Task Manager API

A RESTful API for managing tasks built with Node.js, Express, and MongoDB, with a clean frontend interface.

## Features

- Create, read, update, and delete tasks
- Task status tracking
- Pagination and filtering support
- Frontend interface for task management
- Responsive design with modern CSS
- Error handling and custom response formats
- Query parameter parsing for advanced filtering

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Modern web browser

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
| GET    | /api/v1/tasks | Get all tasks with filtering options |
| POST   | /api/v1/tasks | Create a new task |
| GET    | /api/v1/tasks/:id | Get a single task |
| PATCH  | /api/v1/tasks/:id | Update a task |
| DELETE | /api/v1/tasks/:id | Delete a task |

### Query Parameters

The GET /api/v1/tasks endpoint supports the following query parameters:

- `page`: Page number for pagination (default: 1)
- `limit`: Number of items per page (default: 10)
- `sort`: Sort field (default: "createdAt")
- `fields`: Select specific fields
- `numericFilters`: Apply numeric filters (>, <, >=, <=)
- `search`: Search in specific fields

### Response Format

The API returns responses in a consistent format:

```json
{
  "isSuccess": true,
  "data": [],
  "page": 1,
  "limit": 10,
  "total": 0,
  "totalPages": 0,
  "hasNext": false,
  "hasPrevious": false
}
```

## Frontend Interface

The project includes a frontend interface with the following features:

- Task listing with completion status
- Add new tasks
- Edit existing tasks
- Delete tasks
- Responsive design
- Success/Error notifications

## Error Handling

The API uses conventional HTTP response codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## Project Structure

```
├── app.js              # Application entry point
├── controllers/        # Route controllers
├── middleware/         # Custom middleware
├── models/            # Database models
├── public/            # Frontend assets
├── routes/            # API routes
├── utils/             # Utility functions
└── db/                # Database connection
```

## Technologies Used

- Express.js
- MongoDB with Mongoose
- CORS
- dotenv
- HTTP Status Codes
- Frontend: HTML5, CSS3, JavaScript
- Axios for API calls