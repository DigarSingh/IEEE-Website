import mongoose from 'mongoose';

const QuizStateSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false
  },
  currentRound: {
    type: Number,
    default: 1,
    enum: [1]
  },
  globalTimer: {
    type: Number,
    default: 0
  },
  round1: {
    isActive: {
      type: Boolean,
      default: false
    },
    globalTimer: {
      type: Number,
      default: 0
    },
    startTime: {
      type: Date,
      default: null
    },
    endTime: {
      type: Date,
      default: null
    },
    duration: {
      type: Number,
      default: 45 * 60 // 45 minutes in seconds
    },
    password: {
      type: String,
      default: "ieee@kindlejr4.0"
    }
  },
  quizSettings: {
    duration: {
      type: Number,
      default: 45 // minutes
    },
    questionsPerRound: {
      type: Number,
      default: 25
    },
    allowMultipleAttempts: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Ensure only one quiz state document exists
QuizStateSchema.index({ _id: 1 }, { unique: true });

export default mongoose.models.QuizState || mongoose.model('QuizState', QuizStateSchema);
