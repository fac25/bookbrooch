// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBjEN0pcmElQ2_i_0ZKdthccubwPqiksdE",
//   authDomain: "bookbrooch.firebaseapp.com",
//   projectId: "bookbrooch",
//   storageBucket: "bookbrooch.appspot.com",
//   messagingSenderId: "948163309892",
//   appId: "1:948163309892:web:a9e4349da7f0e95c452711",
// };

// NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyBjEN0pcmElQ2_i_0ZKdthccubwPqiksdE"
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="bookbrooch.firebaseapp.com"
// NEXT_PUBLIC_FIREBASE_PROJECT_ID="bookbrooch"
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="bookbrooch.appspot.com"
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="948163309892"
// NEXT_PUBLIC_FIREBASE_APP_ID="1:948163309892:web:a9e4349da7f0e95c452711"

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
