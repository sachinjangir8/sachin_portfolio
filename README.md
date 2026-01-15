# Portfolio CMS - Full-Stack Portfolio Website

A modern, dynamic portfolio website with a single admin panel for content management.

## Features

- **Admin Panel**: Secure login with full CRUD operations for projects, categories, and profile
- **Public Portfolio**: Beautiful, responsive portfolio view with project filtering
- **Dark/Light Mode**: Theme switching with smooth transitions
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT
- **File Upload**: Multer (for project images)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Initial Admin Setup

Create your admin account using one of these methods:

**Option 1: Setup Script (Recommended)**
```bash
node scripts/setup-admin.js admin yourpassword
```

**Option 2: API Endpoint**
```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

**Option 3: MongoDB Direct**
```javascript
// Use MongoDB shell or Compass
const bcrypt = require('bcryptjs');
const hashedPassword = await bcrypt.hash('yourpassword', 10);

db.admins.insertOne({
  username: "admin",
  password: hashedPassword,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

For detailed setup instructions, see [SETUP.md](./SETUP.md).

## Project Structure

```
├── app/
│   ├── (admin)/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── projects/
│   │   │   ├── categories/
│   │   │   └── profile/
│   ├── (public)/
│   │   ├── page.tsx (home)
│   │   └── projects/
│   ├── api/
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── projects/
│   │   ├── categories/
│   │   └── profile/
│   └── layout.tsx
├── components/
│   ├── admin/
│   ├── public/
│   └── shared/
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── models.ts
└── types/
    └── index.ts
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current admin

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/[id]` - Get single project
- `POST /api/admin/projects` - Create project (admin)
- `PUT /api/admin/projects/[id]` - Update project (admin)
- `DELETE /api/admin/projects/[id]` - Delete project (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/admin/categories` - Create category (admin)
- `PUT /api/admin/categories/[id]` - Update category (admin)
- `DELETE /api/admin/categories/[id]` - Delete category (admin)

### Profile
- `GET /api/profile` - Get profile (public)
- `PUT /api/admin/profile` - Update profile (admin)

## License

MIT
