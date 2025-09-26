export const verifyAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    /*return res.status(200).json(message, "user is admin"),*/ next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};
