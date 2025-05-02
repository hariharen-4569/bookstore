import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    RecaptchaVerifier, 
    signInWithPhoneNumber 
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQVko-O2dGZoQViRxU1IkrZmA2bUo3lzI",
    authDomain: "devops-bookstore.firebaseapp.com",
    projectId: "devops-bookstore",
    storageBucket: "devops-bookstore.firebasestorage.app",
    messagingSenderId: "540639120204",
    appId: "1:540639120204:web:fc0163aa8170af5ed7dde9",
    measurementId: "G-YREYWR1R39"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export RecaptchaVerifier and signInWithPhoneNumber for OTP
export { auth, googleProvider, RecaptchaVerifier, signInWithPhoneNumber };
