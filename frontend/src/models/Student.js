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
  }
}, {
  timestamps: true
});

// Primary unique index
StudentSchema.index({ rollNo: 1 }, {
  unique: true,
  name: 'rollNo_unique'
});

// Performance indexes (non-unique)
StudentSchema.index({ createdAt: -1 }, { name: 'createdAt_-1' });
StudentSchema.index({ isActive: 1 }, { name: 'isActive_1' });

// Pre-save middleware to ensure data consistency
StudentSchema.pre('save', function (next) {
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
StudentSchema.statics.createOrUpdate = async function (studentData) {
  const { rollNo, name, ...otherData } = studentData;

  try {
    // Try to find existing student first
    const existingStudent = await this.findOne({
      rollNo: rollNo.trim()
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
        rollNo: rollNo.trim()
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
