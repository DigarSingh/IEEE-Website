import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb+srv://digarSingh90:nFH2FjprhO6VSf0R@cluster0.sjhwbjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Define User schema directly
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  college: String,
  branch: String,
  year: String,
  mobile: String,
  studentId: String,
  isVerified: Boolean,
  membershipStatus: String,
  membershipType: String
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function checkAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const admin = await User.findOne({ email: "admin@ieee.org" });
    if (!admin) {
      console.log("Admin user not found");
      return;
    }

    console.log("Admin user found:");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("Password hash:", admin.password.substring(0, 20) + "...");

    // Test password
    const testPassword = "admin123";
    console.log("Testing password:", testPassword);
    
    const isMatch = await bcrypt.compare(testPassword, admin.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password doesn't match. Let's update it...");
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(testPassword, salt);
      
      admin.password = hashedPassword;
      await admin.save();
      console.log("Password updated successfully");
      
      // Test again
      const newMatch = await bcrypt.compare(testPassword, admin.password);
      console.log("New password match:", newMatch);
    }

    await mongoose.disconnect();
    console.log("Done");
  } catch (error) {
    console.error("Error:", error);
  }
}

checkAdminUser();
