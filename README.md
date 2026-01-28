# Express.js Backend Template

A clean, production-ready template for building Node.js backend applications with Express.js. Designed to serve as a baseline for rapid project initialization with pre-configured middleware, database connectivity, and error handling.

This is a template repository. When using this for new projects:

1. Update `package.json` with your project name and description
2. Customize environment variables in `.env`
3. Extend models, controllers, and routes as needed
4. Remove unused example code (like the User routes)
5. Add your own business logic

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [⚠️ Important: Environment Variables & Secrets](#️-important-environment-variables--secrets)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Usage Example](#usage-example)
- [Dependencies](#dependencies)
- [Available Scripts](#available-scripts)
- [Error Handling](#error-handling)
- [Database Connection](#database-connection)
- [Contributing](#contributing)
- [License](#license)
- [Support & Documentation](#support--documentation)

---

## Features

- **Express.js 5.x** - Fast, unopinionated web framework for Node.js
- **MongoDB Integration** - Mongoose ODM for schema validation and database operations
- **Security & CORS** - Pre-configured CORS middleware and cookie parsing
- **Request Logging** - Morgan middleware for HTTP request logging
- **Error Handling** - Centralized error handling middleware with consistent JSON responses
- **Environment Configuration** - Dotenv support for environment-based configuration
- **Development Tooling** - Nodemon for automatic server restart during development
- **ES Modules** - Modern JavaScript module syntax throughout

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** (comes with Node.js)
- **MongoDB** (local or Atlas cloud database)

## Installation

1. **Clone or fork this template**
   ```bash
   git clone <repository-url>
   cd expressjs-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```

## ⚠️ Important: Environment Variables & Secrets

**The `.env` file is NOT included in this repository** and must be created by anyone who clones or forks this project.

### Security Guidelines

- **Never commit `.env` files** to version control (Git)
- **Never push secrets** like database URLs, API keys, or passwords to public repositories
- The `.env` file is listed in `.gitignore` to prevent accidental commits
- Each developer should create their own `.env` file with their local configuration
- In production, use your platform's secret management (e.g., environment variables in deployment services)

### What Goes in `.env`

Store all sensitive information in your `.env` file:
- Database connection strings
- API keys
- Secret tokens
- Any other credentials or configuration specific to your environment

**Example `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

When you fork or clone this repository, create your own `.env` file and add it to `.gitignore` (already configured).

## Project Structure

```
expressjs-template/
├── config/
│   ├── database.js          # MongoDB/Mongoose configuration
│   └── env.js               # Environment variables loader
├── controllers/
│   └── user.controller.js   # Business logic for user routes
├── middleware/
│   └── error-handlers.js    # Centralized error handling
├── models/
│   └── User.model.js        # MongoDB schema definitions
├── routes/
│   └── user.routes.js       # API route definitions
├── utils/                   # Utility functions (empty, ready for use)
├── app.js                   # Express app configuration and middleware setup
├── server.js                # Server entry point
├── package.json             # Project dependencies
└── README.md                # This file
```

### Key Files

- **`server.js`** - Application entry point. Initializes the server and database connection.
- **`app.js`** - Express app configuration. Sets up all middleware, routes, and error handlers.
- **`config/database.js`** - MongoDB connection setup with event listeners for connection status.
- **`config/env.js`** - Centralizes environment variable loading with validation.
- **`middleware/error-handlers.js`** - Global error handling for both 404s and server errors.

## Quick Start

1. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000` and automatically restart on file changes.

2. **Start the production server**
   ```bash
   npm run stat
   ```

3. **Test the server**
   ```bash
   curl http://localhost:5000
   ```
   Expected response:
   ```json
   {
     "message": "Nothing to see here, only a teapot minding its business..."
   }
   ```

## API Endpoints

### Users
- `GET /users` - Fetch user data (example endpoint)

## Configuration

### Environment Variables

Configure your application by setting these variables in your `.env` file:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server listening port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/myapp` |

### Middleware

The application includes the following pre-configured middleware:

- **Morgan** - HTTP request logging (dev mode)
- **CORS** - Cross-Origin Resource Sharing (all origins allowed by default)
- **Cookie Parser** - Parse incoming cookies
- **Express JSON** - Parse JSON request bodies
- **Express URL Encoded** - Parse form data

## Usage Example

### Creating a New Route

1. **Create a controller** in `controllers/`:
   ```javascript
   export async function getItems(limit = 10) {
     return async (req, res, next) => {
       try {
         // Your business logic here
         res.json({ items: [] });
       } catch (error) {
         next(error);
       }
     };
   }
   ```

2. **Create a route** in `routes/`:
   ```javascript
   import express from "express";
   import { getItems } from "../controllers/item.controller.js";

   const router = express.Router();
   router.get("/", getItems(10));

   export default router;
   ```

3. **Register the route** in `app.js`:
   ```javascript
   import itemRoutes from "./routes/item.routes.js";
   app.use("/items", itemRoutes);
   ```

### Creating a MongoDB Model

1. **Create a model** in `models/`:
   ```javascript
   import { Schema, model } from "mongoose";

   const itemSchema = new Schema({
     name: { type: String, required: true },
     description: { type: String },
     price: { type: Number, required: true },
   });

   export default model("Item", itemSchema);
   ```

2. **Use it in controllers**:
   ```javascript
   import Item from "../models/Item.model.js";
   
   export async function getItems(limit = 10) {
     return async (req, res, next) => {
       try {
         const items = await Item.find().limit(limit);
         res.json({ items });
       } catch (error) {
         next(error);
       }
     };
   }
   ```

## Dependencies

### Production Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **cookie-parser** - Cookie parsing middleware
- **morgan** - HTTP request logger
- **dotenv** - Environment variable loader

### Development Dependencies
- **nodemon** - Auto-restart server during development

## Available Scripts

```bash
# Development server with auto-restart
npm run dev

# Production server
npm run stat
```

## Error Handling

The application includes a centralized error handling system:

- **404 Errors** - Triggered when a route is not found
- **5xx Errors** - Caught server errors with consistent JSON response format

All errors are returned in the following format:
```json
{
  "message": "Error description"
}
```

Customize error handling in `middleware/error-handlers.js`.

## Database Connection

The template uses **Mongoose** for MongoDB connectivity. Connection status is logged via console:

```
✅ MongoDB connected to launcher-test
❌ MongoDB error: <error message>
```

Adjust database name and connection options in `config/database.js`.

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request


Development Guidelines:

- Write clean, commented code
- Test all new features before submitting
- Follow the existing code style
- Update documentation for major changes

## License

MIT - See LICENSE file for details

## Author

Alvaro Sarria Rico

---

## Support & Documentation

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Node.js Documentation](https://nodejs.org/)

Happy coding! 🚀