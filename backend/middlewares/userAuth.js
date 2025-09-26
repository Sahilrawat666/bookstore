import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"
    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      // Fetch full user from DB
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      req.user = user; // attach full user
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Auth error" });
  }
};
