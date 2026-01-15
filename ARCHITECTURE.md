# Portfolio CMS - System Architecture

## Overview

This is a full-stack portfolio website with a single admin panel for content management. The system uses Next.js 14 with App Router, MongoDB for data storage, and JWT for authentication.

## System Roles

### 1. Admin (Single Account)
- **Access**: `/admin/*` routes
- **Authentication**: JWT-based with HTTP-only cookies
- **Capabilities**:
  - CRUD operations for Projects
  - CRUD operations for Categories
  - Profile management (social links, contact info)
  - Dashboard with statistics
  - Project visibility control (publish/unpublish)

### 2. Visitors (Public)
- **Access**: Public routes (`/`)
- **Capabilities**:
  - View published projects
  - Filter projects by category
  - View profile information
  - Access social links

## Database Schema

### Admin Collection
```typescript
{
  _id: ObjectId,
  username: string,
  password: string (bcrypt hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Category Collection
```typescript
{
  _id: ObjectId,
  name: string,
  slug: string (auto-generated),
  description?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Project Collection
```typescript
{
  _id: ObjectId,
  title: string,
  description: string,
  techStack: string[],
  category: string (Category ID),
  liveDemoLink?: string,
  githubLink?: string,
  images: string[],
  isPublished: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Profile Collection (Single Document)
```typescript
{
  _id: ObjectId,
  name?: string,
  bio?: string,
  githubLink?: string,
  linkedinLink?: string,
  twitterLink?: string,
  resumeLink?: string,
  contactEmail: string,
  updatedAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current admin (protected)

### Admin Setup
- `POST /api/admin/setup` - Create first admin (only if none exists)

### Projects (Public)
- `GET /api/projects` - Get all published projects
  - Query params: `category`, `published`
- `GET /api/projects/[id]` - Get single project

### Projects (Admin - Protected)
- `GET /api/admin/projects` - Get all projects (including unpublished)
- `POST /api/admin/projects` - Create project
- `GET /api/admin/projects/[id]` - Get single project
- `PUT /api/admin/projects/[id]` - Update project
- `DELETE /api/admin/projects/[id]` - Delete project

### Categories (Public)
- `GET /api/categories` - Get all categories

### Categories (Admin - Protected)
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category

### Profile (Public)
- `GET /api/profile` - Get profile

### Profile (Admin - Protected)
- `GET /api/admin/profile` - Get profile
- `PUT /api/admin/profile` - Update profile

### Stats (Admin - Protected)
- `GET /api/admin/stats` - Get dashboard statistics

## Authentication Flow

1. Admin submits login form with username/password
2. Server verifies credentials against MongoDB
3. If valid, server generates JWT token
4. Token stored in HTTP-only cookie
5. Subsequent requests include token in Authorization header or cookie
6. Middleware validates token on protected routes

## Folder Structure

```
├── app/
│   ├── (admin)/              # Admin route group
│   │   └── admin/
│   │       ├── login/        # Login page
│   │       ├── dashboard/    # Dashboard
│   │       ├── projects/     # Project management
│   │       ├── categories/   # Category management
│   │       └── profile/      # Profile settings
│   ├── (public)/             # Public route group
│   │   └── page.tsx          # Home page
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication
│   │   ├── admin/            # Admin endpoints
│   │   ├── projects/         # Project endpoints
│   │   ├── categories/       # Category endpoints
│   │   └── profile/          # Profile endpoints
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── sitemap.ts            # SEO sitemap
│   └── robots.ts             # SEO robots.txt
├── components/
│   ├── admin/                # Admin components
│   │   └── AdminLayout.tsx   # Admin layout wrapper
│   ├── public/               # Public components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   └── Projects.tsx
│   └── shared/               # Shared components
│       ├── ThemeProvider.tsx
│       ├── ThemeToggle.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── db.ts                 # MongoDB connection
│   ├── models.ts             # Database models/queries
│   ├── auth.ts               # Authentication utilities
│   ├── middleware.ts         # Auth middleware
│   └── api.ts                # API client utilities
├── types/
│   └── index.ts              # TypeScript types
└── public/                   # Static assets
```

## Security Features

1. **JWT Authentication**: Secure token-based auth
2. **HTTP-Only Cookies**: Prevents XSS attacks
3. **Password Hashing**: bcrypt with salt rounds
4. **Protected Routes**: Middleware validation
5. **Input Validation**: Server-side validation on all endpoints
6. **Single Admin**: Only one admin account allowed

## SEO Features

1. **Metadata**: Dynamic meta tags in layout
2. **Sitemap**: Auto-generated sitemap.xml
3. **Robots.txt**: Proper crawler directives
4. **Semantic HTML**: Proper HTML structure
5. **Open Graph**: Social media sharing support

## Performance Optimizations

1. **Server Components**: Next.js 14 App Router
2. **Image Optimization**: Next.js Image component
3. **Code Splitting**: Automatic route-based splitting
4. **Caching**: API route caching strategies
5. **Lazy Loading**: Component-level lazy loading

## Deployment Considerations

1. **Environment Variables**: Required in `.env.local`
2. **MongoDB**: Use MongoDB Atlas for production
3. **JWT Secret**: Use strong random string
4. **HTTPS**: Required for secure cookies
5. **CORS**: Configure if using separate frontend/backend

## Future Enhancements

- Image upload handling (currently URLs only)
- Project search functionality
- Analytics integration
- Contact form
- Blog section
- Multi-language support
