// Import port variables
import { envVariables } from "./config/env.js";
const port = envVariables.port;

// Import my server application
import { app } from "./app.js";

// Importing my DB client
import { connectDB } from "./config/database.js";
// Starting DB connection
connectDB();

// Start server
app.listen(port, (req, res) => {
  console.log(`Server listening on port: ${port}`);
});
