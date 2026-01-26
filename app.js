// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express from "express";
// Enables console logs from server when making requests to the application
// https://www.npmjs.com/package/morgan
import logger from "morgan";
// Enables CORS - Cross origin resource sharing (enabled if app is reached from a different origin)
// www.npmjs.com/package/cors
import cors from "cors";
// Parses the Cookie header of incoming HTTP requests and exposes cookies as a convenient object on req.cookies (and req.signedCookies)
// https://www.npmjs.com/package/cookie-parser
import cookieParser from "cookie-parser";
// Import routers
import userRoutes from "./routes/user.routes.js";
// Import error handlers middleware
import errorHandlers from "./middleware/error-handlers.js";

// App initalization
const app = express();

// Configures the application to recognize is being reached out by a proxy
// https://expressjs.com/en/api.html#app.use
app.set("trust proxy", 1);

// Middleware configuration
// Different options available besides "dev", check documentation if needed
app.use(logger("dev"));
// Client address needs tobe added as origin to enable requests
app.use(cors({ origin: "*" }));
app.use(cookieParser());
// Parses incoming JSON request bodies and exposes them on req.body
// https://expressjs.com/en/5x/api.html#express.json
app.use(express.json());
// Parses application/x-www-form-urlencoded request bodies (HTML form data) into req.body
// https://expressjs.com/en/5x/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }));

// Start route handling
// Define root route, typically user for server health check (e.g. running)
app.get("/", (req, res) => {
  res.status(418).json({
    message: "Nothing to see here, only a teapot minding its business...",
  });
});
// Load user routes (dummy example for template)
app.use("/users", userRoutes);

// Load error handlers middleware
errorHandlers(app);

export { app };
