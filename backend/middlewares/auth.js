// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"

//     if (!token) return res.status(401).json({ message: "No token provided" });

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) return res.status(403).json({ message: "Invalid token" });

//       req.user = decoded; // save decoded user info (id, email)
//       next();
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Auth error" });
//   }
// };
