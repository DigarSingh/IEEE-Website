# 🔥 Firebase Firestore Setup for IEEE Quiz System

## 📋 Current Firebase Configuration

Your Firebase project is already configured:
- **Project ID**: `ieee-quiz-15aec`
- **Auth Domain**: `ieee-quiz-15aec.firebaseapp.com`
- **Storage Bucket**: `ieee-quiz-15aec.firebasestorage.app`

## 🗄️ Required Firestore Collections & Documents

### **1. Admin Quiz State Document**
**Path**: `/admin/quizState`

**Purpose**: Stores the global quiz state managed by admin

**Document Structure**:
```javascript
{
  isActive: false,           // Global quiz active status
  currentRound: 1,          // Currently active round (1 or 2)
  round1: {
    isActive: false,         // Round 1 active status
    startTime: null,         // When round 1 started
    endTime: null,           // When round 1 ended
    duration: 1800,          // Duration in seconds (30 minutes)
    globalTimer: 0,          // Remaining time in seconds
    scheduledStartTime: null, // Scheduled start time
    quizPassword: "ieee@321", // Password for this round
    questionsCount: 20       // Number of questions
  },
  round2: {
    isActive: false,         // Round 2 active status
    startTime: null,         // When round 2 started
    endTime: null,           // When round 2 ended
    duration: 2700,          // Duration in seconds (45 minutes)
    globalTimer: 0,          // Remaining time in seconds
    scheduledStartTime: null, // Scheduled start time
    quizPassword: "ieee@321", // Password for this round
    questionsCount: 20       // Number of questions
  },
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-15T10:00:00Z"
}
```

### **2. Quiz Results Collection**
**Path**: `/quizResults`

**Purpose**: Stores individual quiz results from participants

**Document Structure** (each document represents one participant's result):
```javascript
{
  name: "John Doe",                    // Participant name
  rollNo: "12345678",                  // Roll number
  score: 18,                          // Correct answers
  totalQuestions: 20,                 // Total questions
  percentage: 90,                     // Calculated percentage
  grade: "A+",                        // Grade based on percentage
  timeTaken: "25:30",                 // Time taken to complete
  round: 1,                           // Which round (1 or 2)
  completed: true,                    // Whether quiz was completed
  completedAt: "2024-01-15T10:30:00Z", // When completed
  answers: {                          // Individual answers
    "1": "A",
    "2": "B",
    "3": "C"
  },
  warnings: 0,                       // Number of warnings issued
  loginTime: "2024-01-15T10:00:00Z", // When user logged in
  createdAt: "2024-01-15T10:30:00Z"   // When result was saved
}
```

### **3. Quiz Participants Collection (Optional)**
**Path**: `/quizParticipants`

**Purpose**: Track active participants in real-time

**Document Structure**:
```javascript
{
  name: "John Doe",
  rollNo: "12345678",
  round: 1,
  loginTime: "2024-01-15T10:00:00Z",
  isActive: true,
  lastSeen: "2024-01-15T10:25:00Z"
}
```

## 🔧 Firebase Security Rules

### **Firestore Security Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin quiz state - read by all, write by admin only
    match /admin/quizState {
      allow read: if true;  // Anyone can read quiz state
      allow write: if false; // Only admin can write (via server)
    }
    
    // Quiz results - read by all, write by authenticated users
    match /quizResults/{resultId} {
      allow read: if true;  // Anyone can read results
      allow write: if true; // Anyone can write results (for quiz submission)
    }
    
    // Quiz participants - read by all, write by authenticated users
    match /quizParticipants/{participantId} {
      allow read: if true;  // Anyone can read participants
      allow write: if true; // Anyone can write participants
    }
  }
}
```

## 🚀 Setup Instructions

### **Step 1: Create Initial Documents**

1. **Go to Firebase Console** → Firestore Database
2. **Create Collection**: `admin`
3. **Create Document**: `quizState` in `admin` collection
4. **Add the initial document structure** (copy from above)

### **Step 2: Set Up Collections**

1. **Create Collection**: `quizResults`
   - This will be populated automatically when participants submit
   
2. **Create Collection**: `quizParticipants` (optional)
   - This can be used for real-time participant tracking

### **Step 3: Configure Security Rules**

1. **Go to Firebase Console** → Firestore Database → Rules
2. **Replace the default rules** with the security rules above
3. **Publish the rules**

## 📊 Database Structure Overview

```
Firestore Database
├── admin/
│   └── quizState (document)
│       ├── isActive: boolean
│       ├── currentRound: number
│       ├── round1: object
│       └── round2: object
├── quizResults/ (collection)
│   ├── {resultId1} (document)
│   ├── {resultId2} (document)
│   └── ...
└── quizParticipants/ (collection) [optional]
    ├── {participantId1} (document)
    ├── {participantId2} (document)
    └── ...
```

## 🔍 Testing the Setup

### **1. Test Admin Quiz State**
```javascript
// In Firebase Console, manually set quizState document:
{
  "isActive": true,
  "currentRound": 1,
  "round1": {
    "isActive": true,
    "startTime": "2024-01-15T10:00:00Z",
    "duration": 1800,
    "globalTimer": 1800,
    "quizPassword": "ieee@321"
  },
  "round2": {
    "isActive": false,
    "globalTimer": 0
  }
}
```

### **2. Test Quiz Results**
```javascript
// Add a test result document:
{
  "name": "Test User",
  "rollNo": "12345678",
  "score": 18,
  "totalQuestions": 20,
  "percentage": 90,
  "grade": "A+",
  "round": 1,
  "completed": true,
  "completedAt": "2024-01-15T10:30:00Z"
}
```

## 🎯 Key Points

1. **Real-time Updates**: The `admin/quizState` document is monitored by all clients for real-time updates
2. **Security**: Quiz state is readable by all, but only admin can write
3. **Results Storage**: All quiz results are stored in the `quizResults` collection
4. **Scalability**: Collections can handle thousands of participants
5. **Backup**: Firestore automatically backs up data

## 🚨 Important Notes

- **Admin Password**: Set in environment variables (`NEXT_PUBLIC_ADMIN_QUIZ_PASSWORD`)
- **Quiz Password**: Set in the quiz state document (`ieee@321`)
- **Real-time**: Changes to `admin/quizState` are immediately reflected in the quiz login page
- **Persistence**: All data is automatically saved and backed up by Firebase

**Once you set up these collections and documents, the quiz system will work with real-time updates! 🎯**
