// Import user data model to work with mongoDB collection
import User from "../models/User.model.js";

// Retrieve n number of users information
export const getUsers = (limit) => {
  return async (req, res) => {
    const users = await User.find().limit(limit);
    res.json({ data: users });
  };
};
