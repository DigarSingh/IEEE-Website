import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

// Import models to register them
import "../models/User.js";
import "../models/Event.js";
import "../models/Certificate.js";
import "../models/Message.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://digarsingh90:nFH2FjprhO6VSf0R@cluster0.sjhwbjk.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Insert a dummy user to ensure the collection is created
    const User = mongoose.model("User");
    const dummyEmail = "init-script-dummy@example.com";
    const exists = await User.findOne({ email: dummyEmail });
    if (!exists) {
      await User.create({
        name: "Init Script Dummy",
        email: dummyEmail,
        password: "dummyPassword123",
        college: "IEEE College",
        branch: "CSE",
        year: "1",
        mobile: "1234567890",
        studentId: "DUMMY123",
      });
      console.log("Dummy user inserted to initialize collection.");
    } else {
      console.log("Dummy user already exists.");
    }

    console.log("Collections initialized (if not already present).");
    process.exit(0);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

main();
