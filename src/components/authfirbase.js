// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const firebaseConfig = {
	apiKey: "**********************************",
	authDomain: "**********************************",
	projectId: "**************",
	storageBucket:"***********************",
	messagingSenderId: "*****************",
	appId: "**********************************",
	measurementId: "***************"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload()
    return user;
  } catch (error) {
    console.error("Google login error:", error);
    return null;
  }
};

export { auth };
