// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFApJoNZIyXlBJeeZMFaFWhprXPFvnurE",
  authDomain: "openlibrary-61f2b.firebaseapp.com",
  projectId: "openlibrary-61f2b",
  storageBucket: "openlibrary-61f2b.firebasestorage.app",
  messagingSenderId: "464885166928",
  appId: "1:464885166928:web:91b30221af0fd5d9df7255",
  measurementId: "G-FCD3LFX46P"
};

const app = initializeApp(firebaseConfig);

// Firebase Auth instance
export const auth = getAuth(app);
