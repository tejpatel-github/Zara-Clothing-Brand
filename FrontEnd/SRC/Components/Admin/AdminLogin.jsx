import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLogin = () => {
  const [state, setState] = useState("Admin Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  function loginToast() {
    toast.success("Welcome", { position: "top-right" });
  }

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (state === "Admin Sign Up" && !formData.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validateForm()) return;
    try {
      const response = await fetch("http://localhost:4000/AdminLogin", {
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
          window.location.replace("/admin");
        }, 2000);
      } else {
        toast.error(data.errors);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
    }
  };

  const signup = async () => {
    if (!validateForm()) return;
    try {
      const response = await fetch("http://localhost:4000/AdminSignup", {
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
        window.location.replace("/admin");
      } else {
        toast.error(data.errors);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to signup. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">{state}</h2>
        <div className="mb-3">
          {state === "Admin Sign Up" && (
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          )}
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button className="btn btn-primary w-100 mb-3" onClick={() => (state === "Admin Login" ? login() : signup())}>
          Continue
        </button>

        <p className="text-center">
          {state === "Admin Login" ? (
            <>Create an Admin account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setState("Admin Sign Up")}>Sign Up</span></>
          ) : (
            <>Already have an Admin account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setState("Admin Login")}>Login here</span></>
          )}
        </p>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default AdminLogin;