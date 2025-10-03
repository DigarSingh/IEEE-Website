// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfF5vjulpfDWBEXmEUjMNJNtG1RzI6Eqw",
  authDomain: "ieee-quiz-15aec.firebaseapp.com",
  projectId: "ieee-quiz-15aec",
  storageBucket: "ieee-quiz-15aec.firebasestorage.app",
  messagingSenderId: "225813222869",
  appId: "1:225813222869:web:644f7d9c88d313dda2595c",
  measurementId: "G-5MLVVBPH3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };
export default app;