// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFOPrm-YaHRbsZ38F7y0jYtGI6iCxzXJQ",
  authDomain: "layera-dev.firebaseapp.com",
  projectId: "layera-dev",
  storageBucket: "layera-dev.appspot.com",
  messagingSenderId: "318578122017",
  appId: "1:318578122017:web:c4b15fbe9f42b55b9db260"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;