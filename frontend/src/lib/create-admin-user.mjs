import mongoose from "mongoose";

// Define User schema directly since we're not using the model file
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  profilePhoto: {
    type: String,
    default: 'default-profile.jpg'
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true
  },
  branch: {
    type: String,
    required: [true, 'Branch/Department is required'],
    trim: true
  },
  year: {
    type: String,
    required: [true, 'Year of study is required'],
    trim: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'],
    trim: true
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    trim: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  membershipStatus: {
    type: String,
    enum: ['pending', 'active', 'expired', 'suspended'],
    default: 'pending'
  },
  membershipType: {
    type: String,
    enum: ['student', 'graduate', 'member', 'senior', 'fellow', 'life'],
    default: 'student'
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerificationToken: String,
  emailVerificationExpire: Date
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const bcrypt = await import('bcryptjs');
    const salt = await bcrypt.default.genSalt(12);
    this.password = await bcrypt.default.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://digarsingh90:nFH2FjprhO6VSf0R@cluster0.sjhwbjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
      
      // Check if it's already an admin
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log("Updated user role to admin");
      }
      
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
      membershipStatus: "active",
      membershipType: "member"
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
        membershipStatus: "active"
      });
      console.log("Test student user also created:", testStudent.email);
      console.log("Student login - Email: student@ieee.org, Password: student123");
    }

    await mongoose.disconnect();
    console.log("Database connection closed");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin user:", err);
    process.exit(1);
  }
}

createAdminUser();
