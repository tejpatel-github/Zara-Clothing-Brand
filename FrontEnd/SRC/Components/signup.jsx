import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  function loginToast() {
    toast.success("Welcome", { position: "top-right" });
  }

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("user-email", formData.email);
        loginToast();
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Please try again.");
    }
  };

  const signup = async () => {
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("user-email", formData.email);
        loginToast();
        window.location.replace("/");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to signup. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default LoginSignup;
