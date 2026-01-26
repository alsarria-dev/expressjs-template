// Import User controller functions
import { getUsers } from "../controllers/user.controller.js";
// Import router to wrap up all user routes through it
import express from "express";
const router = express.Router();

// Gets user details
router.get("/", getUsers(5));

export default router;
