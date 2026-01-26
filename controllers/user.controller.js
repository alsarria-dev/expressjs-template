import User from "../models/User.model.js";

export const getUsers = (limit) => {
  return async (req, res) => {
    const users = await User.find().limit(limit);
    res.json({ data: users });
  };
};
