const mongoose = require("mongoose");
const User = require("../models/User.js");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://digarsingh90:nFH2FjprhO6VSf0R@cluster0.sjhwbjk.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

async function createAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@ieee.org" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      console.log("Login credentials:");
      console.log("Email: admin@ieee.org");
      console.log("Password: admin123");
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      name: "IEEE Admin",
      email: "admin@ieee.org",
      password: "admin123",
      college: "IEEE Admin Portal",
      branch: "Administration",
      year: "Faculty",
      mobile: "9999999999",
      studentId: "ADMIN001",
      role: "admin",
      isVerified: true,
    });

    console.log("Admin user created successfully:", adminUser.email);
    console.log("Login credentials:");
    console.log("Email: admin@ieee.org");
    console.log("Password: admin123");

    // Also ensure test student exists
    const existingStudent = await User.findOne({ email: "student@ieee.org" });
    if (!existingStudent) {
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
      console.log("Test student user also created:", testStudent.email);
      console.log("Student login - Email: student@ieee.org, Password: student123");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error creating admin user:", err);
    process.exit(1);
  }
}

createAdminUser();
