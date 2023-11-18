import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const Email = email.toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowError(true);
      return;
    }

    try {
      let response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: Email, password }),
      });

      response = await response.json();

      if (!response.error) {
        toast.success("Login Successful");
        localStorage.setItem("token", response.token);

        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("An error occurred while registering user:", error);
    }
  };

  return (
    <div className="SignupContainer">
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit">Submit</button>

        <Link to="/forgotPassword">Forgot Password</Link>
      </form>
      {showError && (
        <span className="fill-fields-error">Please Fill all the fields</span>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
