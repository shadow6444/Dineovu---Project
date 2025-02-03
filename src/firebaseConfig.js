// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIy3TPzL6u45GuOi0O0V3FbpKcBfRqT0A",
  authDomain: "dineovu.firebaseapp.com",
  projectId: "dineovu",
  storageBucket: "dineovu.firebasestorage.app",
  messagingSenderId: "809748933795",
  appId: "1:809748933795:web:cfe9f3b3838d51855e6316",
  measurementId: "G-T9WHHPQRYK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, signInWithPopup, analytics };
