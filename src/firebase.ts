// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLuwLXmfABvuiwW2NPHZ3-PcL16TwZd4M",
  authDomain: "delibwrite-54659.firebaseapp.com",
  projectId: "delibwrite-54659",
  storageBucket: "delibwrite-54659.appspot.com",
  messagingSenderId: "14511931631",
  appId: "1:14511931631:web:7a51b3847cbccd498edb1a",
  measurementId: "G-RGZK2GWDKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);