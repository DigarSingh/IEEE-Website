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
    unique: true,
    trim: true
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

// Index for better query performance
StudentSchema.index({ rollNo: 1 });
StudentSchema.index({ selectedRound: 1 });
StudentSchema.index({ quizCompleted: 1 });
StudentSchema.index({ createdAt: -1 });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
