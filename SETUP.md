# Setup Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or MongoDB Atlas)
- npm or yarn package manager

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Environment Configuration

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: 
- Replace `JWT_SECRET` with a strong random string (use `openssl rand -base64 32` to generate one)
- Update `MONGODB_URI` with your MongoDB connection string

## Step 3: Create Admin Account

You have two options to create the admin account:

### Option A: Using the Setup Script

```bash
node scripts/setup-admin.js admin yourpassword
```

Replace `admin` and `yourpassword` with your desired credentials.

### Option B: Using the API Endpoint

1. Start the development server:
```bash
npm run dev
```

2. Make a POST request to `/api/admin/setup`:
```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

### Option C: Using MongoDB Directly

If you prefer to use MongoDB Compass or mongo shell:

```javascript
// In MongoDB shell or Compass
use portfolio
db.admins.insertOne({
  username: "admin",
  password: "$2a$10$..." // bcrypt hash of your password
})
```

To generate a bcrypt hash, you can use Node.js:
```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('yourpassword', 10).then(console.log);
```

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Step 5: Access Admin Panel

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with your admin credentials
3. Start managing your portfolio!

## Initial Setup Checklist

- [ ] Install dependencies
- [ ] Configure `.env.local`
- [ ] Create admin account
- [ ] Start development server
- [ ] Login to admin panel
- [ ] Create at least one category
- [ ] Add your profile information
- [ ] Create and publish your first project

## Production Deployment

### Environment Variables

Make sure to set these in your hosting platform:

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Strong random secret key
- `NEXT_PUBLIC_APP_URL` - Your production URL (e.g., `https://yourdomain.com`)

### Build and Deploy

```bash
npm run build
npm start
```

### Recommended Hosting Platforms

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**

### MongoDB Hosting

- **MongoDB Atlas** (Free tier available)
- **DigitalOcean Managed MongoDB**
- **Self-hosted MongoDB**

## Troubleshooting

### MongoDB Connection Issues

- Verify your `MONGODB_URI` is correct
- Check if MongoDB is running (for local instances)
- Ensure network access is enabled (for MongoDB Atlas)

### Admin Login Not Working

- Verify admin account exists in database
- Check password hash is correct
- Ensure JWT_SECRET is set

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## Support

For issues or questions, check:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [README.md](./README.md) - Project overview
