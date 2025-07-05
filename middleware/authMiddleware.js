// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized. No token." });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // You can add more checks here if needed (e.g., isAdmin)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized. Invalid token." });
  }
};
