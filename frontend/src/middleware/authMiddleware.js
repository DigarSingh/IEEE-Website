import jwt from "jsonwebtoken";
import User from "@/models/User";

// Generate JWT token
export const generateToken = (id, role = "student") => {
  const jwtSecret = process.env.JWT_SECRET || "secretkey";
  if (!process.env.JWT_SECRET) {
    console.warn(
      "WARNING: Using default JWT secret. Set JWT_SECRET environment variable in production."
    );
  }

  return jwt.sign({ id, role }, jwtSecret, {
    expiresIn: "30d",
  });
};

// Auth middleware for API routes
export const authMiddleware = async (req) => {
  // For development: always return a dummy user, skip all checks
  return {
    success: true,
    user: {
      id: "dummyid",
      name: "Dev User",
      email: "dev@example.com",
      college: "Dev College",
      role: "student",
      isVerified: true,
      studentId: "DEV123",
    },
  };
};
