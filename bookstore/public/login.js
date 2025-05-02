import { auth, googleProvider } from "./firebase-config.js";
import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

window.login = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};

window.googleLogin = function () {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            alert("Google Sign-in Successful!");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};
