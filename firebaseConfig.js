// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd6E1wi5NZ-wpjelI2c2r-tVjErVHXn-E",
  authDomain: "fir-8e344.firebaseapp.com",
  projectId: "fir-8e344",
  storageBucket: "fir-8e344.firebasestorage.app",
  messagingSenderId: "464029057259",
  appId: "1:464029057259:web:220f590ad0da08faf13eae",
  measurementId: "G-VLWV8FNHYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

