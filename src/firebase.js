// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import Firestore for database operations
import { getFirestore } from "firebase/firestore";
// Import Analytics if you're using it (optional)
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7bpcEoXn_yT1E68Kg4fBsBqi43VGstiY",
  authDomain: "arduino-bf5e9.firebaseapp.com",
  databaseURL:
    "https://arduino-bf5e9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arduino-bf5e9",
  storageBucket: "arduino-bf5e9.firebasestorage.app",
  messagingSenderId: "279085636608",
  appId: "1:279085636608:web:3568530d84661a7f428ce5",
  measurementId: "G-72JYKGJNW8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

export { app, db }; // Export app and db for use in other files
