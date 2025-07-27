import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://digarsingh90:nFH2FjprhO6VSf0R@cluster0.sjhwbjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Helper function to determine if we're in build/static generation mode
const isBuildTime = () => {
  try {
    // Check if MongoDB is explicitly disabled
    if (process.env.SKIP_MONGODB === "true") {
      return true;
    }

    // Check for build environment variables
    if (process.env.NEXT_CONFIG_FILE === "next.config.build.js") {
      return true;
    }
    // Check for Vercel's build environment
    if (
      process.env.VERCEL_ENV === "production" &&
      typeof window === "undefined"
    ) {
      return true;
    }
    // Check for Next.js build process
    if (
      process.env.NODE_ENV === "production" &&
      typeof window === "undefined"
    ) {
      return true;
    }
    // Check for development server startup
    if (
      process.env.NODE_ENV === "development" &&
      process.argv.includes("dev")
    ) {
      return false;
    }
    // Check if we're in a static generation context
    if (
      typeof window === "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      // Check if this is during page generation
      const stack = new Error().stack || "";
      if (
        stack.includes("getStaticProps") ||
        stack.includes("getServerSideProps")
      ) {
        return true;
      }
    }

    // More aggressive check for build time
    if (typeof window === "undefined") {
      // Check if we're in a Next.js build context
      const stack = new Error().stack || "";
      if (
        stack.includes("next build") ||
        stack.includes("static generation") ||
        stack.includes("build process") ||
        process.env.NEXT_PHASE === "phase-production-build"
      ) {
        return true;
      }
    }

    // Standard check
    return (
      process.env.NODE_ENV === "production" && typeof window === "undefined"
    );
  } catch (e) {
    // If any error occurs during detection, assume build time to be safe
    return true;
  }
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Mock connection for build time
const createMockConnection = () => {
  console.log("🔄 Build mode detected, using mock MongoDB connection");
  return {
    connection: { readyState: 1 },
    model: (name) => ({
      findOne: () => Promise.resolve(null),
      find: () => Promise.resolve([]),
      countDocuments: () => Promise.resolve(0),
      create: () => Promise.resolve({}),
      findByIdAndUpdate: () => Promise.resolve({}),
      findByIdAndDelete: () => Promise.resolve({}),
      save: () => Promise.resolve({}),
      deleteOne: () => Promise.resolve({}),
      deleteMany: () => Promise.resolve({}),
      updateOne: () => Promise.resolve({}),
      updateMany: () => Promise.resolve({}),
      aggregate: () => Promise.resolve([]),
      distinct: () => Promise.resolve([]),
      limit: () => Promise.resolve([]),
      skip: () => Promise.resolve([]),
      sort: () => Promise.resolve([]),
      select: () => Promise.resolve([]),
      populate: () => Promise.resolve([]),
      lean: () => Promise.resolve([]),
      exec: () => Promise.resolve([]),
    }),
    disconnect: () => Promise.resolve(),
  };
};

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
  // During build time, return a mock connection to prevent errors
  if (isBuildTime()) {
    return createMockConnection();
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Validate MongoDB URI
    if (!MONGODB_URI) {
      console.warn("⚠️ No MongoDB URI provided, using fallback");
    }

    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // Increased timeout to 10s
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 1, // Maintain at least 1 socket connection
      maxIdleTimeMS: 30000, // Close idle connections after 30s
      connectTimeoutMS: 10000, // Give up initial connection after 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
      w: "majority",
    };

    cached.promise = connectWithRetry(MONGODB_URI, opts).catch((error) => {
      console.error("❌ All MongoDB connection attempts failed:", error);
      // Don't log connection string in production for security
      if (process.env.NODE_ENV !== "production") {
        console.log("Connection string:", MONGODB_URI);
      }
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
