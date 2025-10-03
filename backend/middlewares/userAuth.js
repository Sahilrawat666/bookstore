import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1]; // Bearer TOKEN
    if (!token) return res.status(401).json({ message: "Token missing" });

    // verify token synchronously
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Auth error" });
  }
};
