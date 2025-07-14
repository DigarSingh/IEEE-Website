import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ieee_club?authMechanism=DEFAULT';

// Helper function to determine if we're in build/static generation mode
const isBuildTime = () => {
  try {
    // Check for build environment variables
    if (process.env.NEXT_CONFIG_FILE === 'next.config.build.js') {
      return true;
    }
    // Check for Vercel's build environment
    if (process.env.VERCEL_ENV === 'production' && typeof window === 'undefined') {
      return true;
    }
    // Standard check
    return process.env.NODE_ENV === 'production' && typeof window === 'undefined';
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

async function dbConnect() {
  // During build time, return a mock connection to prevent errors
  if (isBuildTime()) {
    console.log('🔄 Build mode detected, skipping MongoDB connection');
    return { connection: { readyState: 1 }, model: () => ({}) };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Validate MongoDB URI
    if (!MONGODB_URI) {
      console.warn('⚠️ No MongoDB URI provided, using fallback');
    }

    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 10, // Maintain up to 10 socket connections
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ Connected to MongoDB successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        // Don't log connection string in production for security
        if (process.env.NODE_ENV !== 'production') {
          console.log('Connection string:', MONGODB_URI);
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
