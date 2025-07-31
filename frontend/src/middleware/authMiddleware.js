import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

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
  try {
    // Connect to database
    await dbConnect();

    // Get token from Authorization header
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        success: false,
        message: "Access denied. No token provided.",
        status: 401,
      };
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      return {
        success: false,
        message: "Access denied. No token provided.",
        status: 401,
      };
    }

    // Verify token
    const jwtSecret = process.env.JWT_SECRET || "secretkey";
    const decoded = jwt.verify(token, jwtSecret);

    // Handle admin case specially
    if (decoded.id === "507f1f77bcf86cd799439011" && decoded.role === "admin") {
      return {
        success: true,
        user: {
          id: "507f1f77bcf86cd799439011",
          name: "IEEE Admin",
          email: "admin@ieee.org",
          branch: "IEEE Admin Portal",
          year: "Admin",
          mobile: "0000000000",
          role: "admin",
          isVerified: true,
          studentId: "ADMIN001",
        },
      };
    }

    // Get user from database for regular users
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return {
        success: false,
        message: "Token is not valid. User not found.",
        status: 401,
      };
    }

    return {
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        branch: user.branch,
        year: user.year,
        mobile: user.mobile,
        role: user.role,
        isVerified: user.isVerified,
        studentId: user.studentId,
      },
    };
  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error.name === "JsonWebTokenError") {
      return {
        success: false,
        message: "Token is not valid.",
        status: 401,
      };
    }

    if (error.name === "TokenExpiredError") {
      return {
        success: false,
        message: "Token has expired.",
        status: 401,
      };
    }

    return {
      success: false,
      message: "Token verification failed.",
      status: 500,
    };
  }
};
