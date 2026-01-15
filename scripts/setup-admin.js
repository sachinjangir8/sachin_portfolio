/**
 * Setup script to create the first admin account
 * Usage: node scripts/setup-admin.js <username> <password>
 */

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.error('Usage: node scripts/setup-admin.js <username> <password>');
  process.exit(1);
}

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

async function setupAdmin() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('portfolio');
    const adminsCollection = db.collection('admins');

    // Check if admin already exists
    const existingAdmin = await adminsCollection.findOne({});
    if (existingAdmin) {
      console.error('Error: An admin account already exists.');
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const result = await adminsCollection.insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('✅ Admin account created successfully!');
    console.log(`   Username: ${username}`);
    console.log(`   ID: ${result.insertedId}`);
  } catch (error) {
    console.error('Error setting up admin:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

setupAdmin();
