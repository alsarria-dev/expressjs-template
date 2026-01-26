// Import mongoose functions to define and validate data models
import { Schema, model } from "mongoose";

// Define my user data Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
});

export default model("User", userSchema);
