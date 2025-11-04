import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollNo: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{8,10}$/, "Roll number must be 8-10 digits"]
  },
  selectedRound: {
    type: Number,
    required: true,
    enum: [1, 2]
  },
  loginTime: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  // Quiz specific data
  quizStarted: {
    type: Boolean,
    default: false
  },
  quizCompleted: {
    type: Boolean,
    default: false
  },
  currentQuestion: {
    type: Number,
    default: 0
  },
  answers: {
    type: Map,
    of: String,
    default: {}
  },
  warnings: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  grade: {
    type: String,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Primary composite unique index: A student can only participate once per round
StudentSchema.index({ rollNo: 1, selectedRound: 1 }, { 
  unique: true, 
  name: 'rollNo_selectedRound_unique' 
});

// Performance indexes (non-unique)
StudentSchema.index({ rollNo: 1 }, { name: 'rollNo_1_performance' });
StudentSchema.index({ selectedRound: 1 }, { name: 'selectedRound_1' });
StudentSchema.index({ quizCompleted: 1 }, { name: 'quizCompleted_1' });
StudentSchema.index({ createdAt: -1 }, { name: 'createdAt_-1' });
StudentSchema.index({ isActive: 1 }, { name: 'isActive_1' });

// Pre-save middleware to ensure data consistency
StudentSchema.pre('save', function(next) {
  // Trim whitespace from rollNo and name
  if (this.rollNo) {
    this.rollNo = this.rollNo.trim();
  }
  if (this.name) {
    this.name = this.name.trim();
  }
  
  // Update lastSeen on every save
  this.lastSeen = new Date();
  
  next();
});

// Static method to safely create or update student
StudentSchema.statics.createOrUpdate = async function(studentData) {
  const { rollNo, selectedRound, name, ...otherData } = studentData;
  
  try {
    // Try to find existing student first
    const existingStudent = await this.findOne({ 
      rollNo: rollNo.trim(), 
      selectedRound 
    });
    
    if (existingStudent) {
      // Update existing student
      Object.assign(existingStudent, {
        name: name.trim(),
        loginTime: new Date(),
        isActive: true,
        ...otherData
      });
      return await existingStudent.save();
    } else {
      // Create new student
      const newStudent = new this({
        rollNo: rollNo.trim(),
        selectedRound,
        name: name.trim(),
        loginTime: new Date(),
        isActive: true,
        ...otherData
      });
      return await newStudent.save();
    }
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error by trying to find and update
      const existingStudent = await this.findOne({ 
        rollNo: rollNo.trim(), 
        selectedRound 
      });
      if (existingStudent) {
        Object.assign(existingStudent, {
          name: name.trim(),
          loginTime: new Date(),
          isActive: true,
          ...otherData
        });
        return await existingStudent.save();
      }
    }
    throw error;
  }
};

// Check if model already exists to prevent OverwriteModelError
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;
