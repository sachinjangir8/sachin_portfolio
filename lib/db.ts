import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

const options = {
  serverSelectionTimeoutMS: 10000,
  family: 4,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  console.warn("⚠️ MONGODB_URI is not defined yet. DB will fail at runtime if used.");
}

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    if (!uri) throw new Error("MONGODB_URI is missing");
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  if (!uri) throw new Error("MONGODB_URI is missing");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(); // Uses DB name from URI
}

export default clientPromise;
