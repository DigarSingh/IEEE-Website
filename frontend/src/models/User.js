import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Check if the model is already defined to avoid overwriting
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
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
  isVerified: {
    type: Boolean,
    default: false
  },
  ieeeId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true // Allow null values while still enforcing uniqueness
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'superadmin'],
    default: 'student'
  },
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}));

// Add pre-save hook for password hashing if not already added
// Using function approach to check if the hook already exists
if (!User.schema.pre.hasOwnProperty('save')) {
  User.schema.pre('save', async function(next) {
    console.log('Pre-save middleware running for user:', this.email);
    
    if (!this.isModified('password')) {
      console.log('Password not modified, skipping hash');
      return next();
    }
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      console.log('Password hashed successfully');
      next();
    } catch (error) {
      console.error('Error hashing password:', error);
      next(error);
    }
  });
}

// Add comparePassword method if not already added
if (!User.schema.methods.comparePassword) {
  User.schema.methods.comparePassword = async function(candidatePassword) {
    try {
      console.log(`Comparing password for user: ${this.email}`);
      
      if (!candidatePassword) {
        console.error('candidatePassword is undefined or null');
        return false;
      }
      
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      console.log(`Password match result for ${this.email}: ${isMatch}`);
      return isMatch;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  };
}

export default User;
