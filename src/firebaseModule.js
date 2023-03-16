import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDYjgn7X52sAuCi0JiqwaLm3tF3wWsmu8s",
    authDomain: "messanger-32b1b.firebaseapp.com",
    projectId: "messanger-32b1b",
    storageBucket: "messanger-32b1b.appspot.com",
    messagingSenderId: "159029795621",
    appId: "1:159029795621:web:45d05ecfb07222ccd558cc",
    measurementId: "G-54NQ5Y8MDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;