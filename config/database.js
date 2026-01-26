// Mongoose is an ODM that provides schema-based modeling and query helpers for MongoDB in Node.js
// https://www.npmjs.com/package/mongoose
import mongoose from "mongoose";
// Import mongodb url variable
import { envVariables } from "./env.js";
const mongoUrl = envVariables.mongoUrl;

// Configuring the client options
const clientOptions = {
  serverSelectionTimeoutMS: 5000,
  // Remember to change this for real DB
  dbName: "dummy",
};

// Definining event listeners (these observers run during connection)
mongoose.connection.on("connected", () =>
  console.log(`✅ MongoDB connected to ${clientOptions.dbName}`),
);
mongoose.connection.on("error", (err) =>
  console.error("❌ MongoDB error:", err),
);
mongoose.connection.on("disconnected", () =>
  console.log("⚠️ MongoDB disconnected"),
);

// Function to create the database connection
async function connectDB() {
  try {
    await mongoose.connect(mongoUrl, clientOptions);
    return mongoose.connection;
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    // If your API cannot work without DB, fail fast:
    process.exit(1);
  }
}

// Gracefully shuts down the app by closing the MongoDB connection when the process receives a SIGINT (Ctrl+C)
const shutdown = async (signal) => {
  console.log(`🛑 ${signal} received. Shutting down...`);
  await mongoose.disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export { connectDB };
