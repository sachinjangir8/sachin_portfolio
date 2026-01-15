# API Documentation

## Base URL

All API endpoints are relative to your application URL (e.g., `http://localhost:3000`).

## Authentication

Admin endpoints require authentication via JWT token. The token is automatically included in cookies after login, or can be sent in the Authorization header:

```
Authorization: Bearer <token>
```

## Public Endpoints

### Get All Projects

**GET** `/api/projects`

Get all published projects.

**Query Parameters:**
- `category` (optional): Filter by category ID
- `published` (optional): Default `true`, set to `false` to include unpublished (admin only)

**Response:**
```json
{
  "projects": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "techStack": ["string"],
      "category": "string",
      "liveDemoLink": "string",
      "githubLink": "string",
      "images": ["string"],
      "isPublished": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Project

**GET** `/api/projects/[id]`

Get a single project by ID.

**Response:**
```json
{
  "project": {
    "_id": "string",
    "title": "string",
    "description": "string",
    "techStack": ["string"],
    "category": "string",
    "liveDemoLink": "string",
    "githubLink": "string",
    "images": ["string"],
    "isPublished": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get All Categories

**GET** `/api/categories`

Get all categories.

**Response:**
```json
{
  "categories": [
    {
      "_id": "string",
      "name": "string",
      "slug": "string",
      "description": "string",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Profile

**GET** `/api/profile`

Get public profile information.

**Response:**
```json
{
  "profile": {
    "_id": "string",
    "name": "string",
    "bio": "string",
    "githubLink": "string",
    "linkedinLink": "string",
    "twitterLink": "string",
    "resumeLink": "string",
    "contactEmail": "string",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Authentication Endpoints

### Login

**POST** `/api/auth/login`

Login as admin.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "admin": {
    "id": "string",
    "username": "string"
  }
}
```

**Errors:**
- `400`: Missing username or password
- `401`: Invalid credentials

### Logout

**POST** `/api/auth/logout`

Logout admin (clears auth cookie).

**Response:**
```json
{
  "success": true
}
```

### Get Current Admin

**GET** `/api/auth/me`

Get current authenticated admin.

**Response:**
```json
{
  "admin": {
    "id": "string",
    "username": "string"
  }
}
```

**Errors:**
- `401`: Unauthorized

## Admin Endpoints

All admin endpoints require authentication.

### Setup Admin

**POST** `/api/admin/setup`

Create the first admin account (only works if no admin exists).

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin created successfully"
}
```

**Errors:**
- `400`: Admin already exists or invalid input
- `500`: Server error

### Get Dashboard Stats

**GET** `/api/admin/stats`

Get dashboard statistics.

**Response:**
```json
{
  "projects": {
    "total": 10,
    "published": 8,
    "unpublished": 2,
    "byCategory": [
      {
        "_id": "category_id",
        "count": 5
      }
    ]
  },
  "categories": {
    "total": 3,
    "list": [...]
  },
  "recentProjects": [...]
}
```

### Projects (Admin)

**GET** `/api/admin/projects`

Get all projects (including unpublished).

**POST** `/api/admin/projects`

Create a new project.

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "techStack": ["string"],
  "category": "string (required)",
  "liveDemoLink": "string",
  "githubLink": "string",
  "images": ["string"],
  "isPublished": false
}
```

**PUT** `/api/admin/projects/[id]`

Update a project.

**Request Body:** (all fields optional)
```json
{
  "title": "string",
  "description": "string",
  "techStack": ["string"],
  "category": "string",
  "liveDemoLink": "string",
  "githubLink": "string",
  "images": ["string"],
  "isPublished": true
}
```

**DELETE** `/api/admin/projects/[id]`

Delete a project.

**Response:**
```json
{
  "success": true
}
```

### Categories (Admin)

**GET** `/api/admin/categories`

Get all categories.

**POST** `/api/admin/categories`

Create a new category.

**Request Body:**
```json
{
  "name": "string (required)",
  "description": "string"
}
```

**PUT** `/api/admin/categories/[id]`

Update a category.

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**DELETE** `/api/admin/categories/[id]`

Delete a category.

### Profile (Admin)

**GET** `/api/admin/profile`

Get profile (same as public endpoint).

**PUT** `/api/admin/profile`

Update profile.

**Request Body:**
```json
{
  "name": "string",
  "bio": "string",
  "githubLink": "string",
  "linkedinLink": "string",
  "twitterLink": "string",
  "resumeLink": "string",
  "contactEmail": "string (required)"
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message"
}
```

**Status Codes:**
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error
