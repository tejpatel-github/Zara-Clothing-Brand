import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLogin = () => {
  const [state, setState] = useState("Admin Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginToast = () => {
    toast.success("Welcome Admin!", { position: "top-right" });
  };

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
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
      const response = await fetch("https://zara-clothing-brand-backend.onrender.com/AdminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const Admindata = await response.json();

      if (Admindata.success) {
        localStorage.setItem("auth-token", Admindata.token);
        localStorage.setItem("user-email", formData.email);
        loginToast();
        setTimeout(() => navigate("/admin"), 1500);
      } else {
        toast.error(Admindata.errors || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Try again.");
    }
  };

  const signup = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("https://zara-clothing-brand-backend.onrender.com/AdminSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const Admindata = await response.json();

      if (Admindata.success) {
        localStorage.setItem("auth-token", Admindata.token);
        localStorage.setItem("user-email", formData.email);
        loginToast();
        setTimeout(() => navigate("/admin"), 1500);
      } else {
        toast.error(Admindata.errors || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Try again.");
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

        <button
          className="btn btn-primary w-100 mb-3"
          onClick={() => (state === "Admin Login" ? login() : signup())}
        >
          {state === "Admin Login" ? "Login" : "Sign Up"}
        </button>

        <p className="text-center">
          {state === "Admin Login" ? (
            <>
              Create an Admin account?{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setState("Admin Sign Up")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an Admin account?{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setState("Admin Login")}
              >
                Login here
              </span>
            </>
          )}
        </p>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default AdminLogin;
