import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwsl_DraoVgQZP-DMaSH6snKURfQX6OrE",
  authDomain: "course-platform-3fe65.firebaseapp.com",
  projectId: "course-platform-3fe65",
  storageBucket: "course-platform-3fe65.appspot.com",
  messagingSenderId: "1043279829312",
  appId: "1:1043279829312:web:f52303d300cd208d1902a5",
  measurementId: "G-DF0G6RMC9L",
  databaseURL:
    "https://course-platform-3fe65-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, database };
