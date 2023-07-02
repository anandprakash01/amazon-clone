import {initializeApp} from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyPtfz8m7PJ0oTrdizokjlKk-udWKH3Ow",
  authDomain: "auth-568f3.firebaseapp.com",
  projectId: "auth-568f3",
  storageBucket: "auth-568f3.appspot.com",
  messagingSenderId: "362002553382",
  appId: "1:362002553382:web:ba13aea380f88f57c264e7",
  measurementId: "G-877LRLWW8G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
