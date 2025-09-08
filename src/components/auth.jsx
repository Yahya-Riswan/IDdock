import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "./authfirbase";
import "../sass/Auth.scss";

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const user = await googleLogin();
    if (user) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Welcome</h1>
        <button onClick={handleGoogleLogin} className="google-btn">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
