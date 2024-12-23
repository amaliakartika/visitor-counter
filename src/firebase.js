// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import Firestore for database operations
import { getFirestore } from "firebase/firestore";
// Import Analytics if you're using it (optional)
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoeBCOFuShXrL__SU-JqPSFMyqM9zJ8mM",
  authDomain: "visitor-counter-82f78.firebaseapp.com",
  databaseURL:
    "https://visitor-counter-82f78-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "visitor-counter-82f78",
  storageBucket: "visitor-counter-82f78.firebasestorage.app",
  messagingSenderId: "708222504895",
  appId: "1:708222504895:web:8d331451de1cb26145db0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

export { app, db }; // Export app and db for use in other files
