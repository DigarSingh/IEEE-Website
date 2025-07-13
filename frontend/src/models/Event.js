import mongoose from 'mongoose';

// Check if the model is already defined to avoid overwriting
const Event = mongoose.models.Event || mongoose.model('Event', new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Event description is required']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  endDate: {
    type: Date
  },
  location: {
    type: String,
    required: [true, 'Event location is required']
  },
  isVirtual: {
    type: Boolean,
    default: false
  },
  virtualLink: {
    type: String
  },
  category: {
    type: String,
    required: [true, 'Event category is required'],
    enum: ['Workshop', 'Webinar', 'Conference', 'Competition', 'Social', 'Other']
  },
  image: {
    type: String,
    default: 'default-event.jpg'
  },
  registrationRequired: {
    type: Boolean,
    default: true
  },
  registrationLink: {
    type: String
  },
  registrationDeadline: {
    type: Date
  },
  maxAttendees: {
    type: Number
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  organizers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  speakers: [{
    name: {
      type: String
    },
    bio: {
      type: String
    },
    image: {
      type: String
    }
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'canceled'],
    default: 'upcoming'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}));

// Add pre-save hook for updatedAt if not already added
if (!Event.schema.pre.hasOwnProperty('save')) {
  Event.schema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
}

export default Event;
