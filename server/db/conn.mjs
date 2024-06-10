import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI || "";

export const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (err) {
  console.error(err);
}

let db = conn.db("");

export default db;