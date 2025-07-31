import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://shivakoranga2004:wmH5pR0YIpTMYYh9@ieee.7fq9giv.mongodb.net/ieee?retryWrites=true&w=majority&appName=IEEE-Website";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Retry connection function
async function connectWithRetry(uri, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(
        `🔄 Attempting MongoDB connection (attempt ${i + 1}/${maxRetries})`
      );
      const result = await mongoose.connect(uri, options);
      console.log("✅ Connected to MongoDB successfully");
      return result;
    } catch (error) {
      console.error(
        `❌ MongoDB connection attempt ${i + 1} failed:`,
        error.message
      );
      if (i === maxRetries - 1) {
        throw error;
      }
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, i) * 1000;
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Validate MongoDB URI
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 1,
      minPoolSize: 0,
      maxIdleTimeMS: 30000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: "majority",
      // Add these options for better serverless compatibility
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    };

    cached.promise = connectWithRetry(MONGODB_URI, opts).catch((error) => {
      console.error("❌ All MongoDB connection attempts failed:", error);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
