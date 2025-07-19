const mongoose = require("mongoose");
const User = require("../models/User.js");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/IEEE";

async function createTestUser() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Check if test student already exists
    const existingUser = await User.findOne({ email: "student@ieee.org" });
    if (existingUser) {
      console.log("Test student user already exists");
      process.exit(0);
    }

    // Create test student user
    const testStudent = await User.create({
      name: "Test Student",
      email: "student@ieee.org",
      password: "student123",
      college: "IEEE Test College",
      branch: "Computer Science",
      year: "3rd Year",
      mobile: "9876543210",
      studentId: "TEST123",
      role: "student",
      isVerified: true,
    });

    console.log("Test student user created successfully:", testStudent.email);
    console.log("Login credentials:");
    console.log("Email: student@ieee.org");
    console.log("Password: student123");

    process.exit(0);
  } catch (err) {
    console.error("Error creating test user:", err);
    process.exit(1);
  }
}

createTestUser();
