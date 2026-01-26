// Enables enviornment variable from .env
// https://www.npmjs.com/package/dotenv
import "dotenv/config";

// Define object to store all my environment variables
const envVariables = {};
envVariables.port = process.env.PORT;
envVariables.mongoUrl = process.env.MONGODB_URI;

// Error if env variables are not found
if (!envVariables) {
  throw new Error(
    "No port defined, add a listening port to the application via .env",
  );
}

export { envVariables };
