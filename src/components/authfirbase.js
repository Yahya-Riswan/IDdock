// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const firebaseConfig = {
	apiKey: "AIzaSyCZMGIMT-po-EfF_8xM2sPQ7-kdFf-92n4",
	authDomain: "iddock-online.firebaseapp.com",
	projectId: "iddock-online",
	storageBucket: "iddock-online.firebasestorage.app",
	messagingSenderId: "1099357637276",
	appId: "1:1099357637276:web:bfbf7517bf25010b0cfb59",
	measurementId: "G-FMJDRRSPG0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Google login error:", error);
    return null;
  }
};

export { auth };
