# 🔥 Firebase Manual Setup Guide

## 🎯 Quick Setup Steps

### **Step 1: Go to Firebase Console**
1. Visit: https://console.firebase.google.com/
2. Select your project: `ieee-quiz-15aec`
3. Go to **Firestore Database**

### **Step 2: Create Admin Quiz State Document**

1. **Click "Start collection"**
2. **Collection ID**: `admin`
3. **Click "Next"**
4. **Document ID**: `quizState`
5. **Add the following fields**:

```javascript
// Field 1: isActive
Field name: isActive
Type: boolean
Value: false

// Field 2: currentRound  
Field name: currentRound
Type: number
Value: 1

// Field 3: round1 (map)
Field name: round1
Type: map
Value: {
  isActive: false,
  startTime: null,
  endTime: null,
  duration: 1800,
  globalTimer: 0,
  scheduledStartTime: null,
  quizPassword: "ieee@321",
  questionsCount: 20
}

// Field 4: round2 (map)
Field name: round2
Type: map
Value: {
  isActive: false,
  startTime: null,
  endTime: null,
  duration: 2700,
  globalTimer: 0,
  scheduledStartTime: null,
  quizPassword: "ieee@321",
  questionsCount: 20
}

// Field 5: createdAt
Field name: createdAt
Type: timestamp
Value: [Current timestamp]

// Field 6: updatedAt
Field name: updatedAt
Type: timestamp
Value: [Current timestamp]
```

6. **Click "Save"**

### **Step 3: Set Up Security Rules**

1. **Go to "Rules" tab** in Firestore Database
2. **Replace the existing rules** with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin quiz state - readable by all, writable by admin
    match /admin/quizState {
      allow read: if true;
      allow write: if true; // For now, allow all writes
    }
    
    // Quiz results - readable and writable by all
    match /quizResults/{resultId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Quiz participants - readable and writable by all
    match /quizParticipants/{participantId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

3. **Click "Publish"**

### **Step 4: Test the Setup**

1. **Go to your quiz login page**: `/quizlogin`
2. **Check if it shows**: "Loading quiz status..."
3. **Then it should show**: "Quiz Not Available" (since we set `isActive: false`)

### **Step 5: Test Admin Dashboard**

1. **Go to admin dashboard**: `/admin-quiz`
2. **Login with password**: `admin@ieee2025`
3. **Try to start a quiz** - this should update the Firebase document
4. **Go back to quiz login** - it should now show "Quiz is Active!"

## 🧪 Testing Scenarios

### **Test 1: Quiz Not Active**
- Quiz login should show "Quiz Not Available"
- Round buttons should show "⚪ Inactive"

### **Test 2: Start Quiz (Admin)**
1. Go to admin dashboard
2. Click "Start Round 1"
3. Check Firebase Console - `admin/quizState` should show `isActive: true`
4. Quiz login should now show "Quiz is Active!"

### **Test 3: Real-time Updates**
1. Start quiz from admin dashboard
2. Open quiz login in another tab
3. Stop quiz from admin dashboard
4. Quiz login should automatically update to "Quiz Not Available"

## 🔍 Troubleshooting

### **Problem: "Loading quiz status..." never ends**
**Solution**: Check Firebase Console → Firestore Database → Rules
- Make sure rules allow reading from `admin/quizState`

### **Problem: Quiz login shows "Quiz Not Available" even when admin started quiz**
**Solution**: 
1. Check Firebase Console → `admin/quizState` document
2. Verify `isActive` is `true`
3. Verify `round1.isActive` is `true` (for Round 1)

### **Problem: Admin dashboard can't start quiz**
**Solution**:
1. Check Firebase Console → Rules
2. Make sure write permissions are enabled
3. Check browser console for errors

### **Problem: Real-time updates not working**
**Solution**:
1. Check Firebase Console → `admin/quizState` document
2. Verify the document structure matches the expected format
3. Check browser console for Firebase connection errors

## 📊 Expected Database Structure

After setup, your Firestore should look like:

```
📁 ieee-quiz-15aec
├── 📁 admin
│   └── 📄 quizState
│       ├── isActive: false
│       ├── currentRound: 1
│       ├── round1: {isActive: false, ...}
│       └── round2: {isActive: false, ...}
├── 📁 quizResults (empty initially)
└── 📁 quizParticipants (empty initially)
```

## ✅ Success Indicators

You'll know the setup is working when:

1. **Quiz login page** loads without "Loading quiz status..." hanging
2. **Admin dashboard** can start/stop quizzes
3. **Real-time updates** work between admin and student views
4. **Firebase Console** shows the `admin/quizState` document
5. **No console errors** in browser developer tools

## 🚀 Next Steps

Once the basic setup is working:

1. **Test with real participants** - have someone try to login
2. **Monitor Firebase Console** - watch documents update in real-time
3. **Test leaderboard** - submit some quiz results and check the leaderboard
4. **Set up production security rules** - restrict write access to admin only

**The quiz system should now work with real-time Firebase integration! 🎯**
