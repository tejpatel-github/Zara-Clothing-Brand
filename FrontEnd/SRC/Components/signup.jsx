import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Navbar.jsx";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotData, setForgotData] = useState({ username: "", email: "", newPassword: "" });

  function loginToast() {
    toast.success("Welcome", { position: "top-right" });
  }

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const forgotChangeHandler = (e) => {
    setForgotData({ ...forgotData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (state === "Sign Up" && !formData.username.trim()) {
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
      const response = await fetch("https://zara-clothing-brand-backend.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      const response = await fetch("https://zara-clothing-brand-backend.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("user-email", formData.email);
        loginToast();
        window.location.replace("/");
      } else {
        toast.error(data.errors);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to signup. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    const { name, email, newPassword } = forgotData;
    if (!name || !email || !newPassword) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await fetch("https://zara-clothing-brand-backend.onrender.com/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forgotData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Password updated successfully!");
        setShowForgotModal(false);
        setForgotData({ name: "", email: "", newPassword: "" });
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">{state}</h2>
          <div className="mb-3">
            {state === "Sign Up" && (
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
              required
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
          </div>

          <button className="btn btn-primary w-100 mb-2" onClick={() => (state === "Login" ? login() : signup())}>
            {state}
          </button>


          <p className="text-center">
            {state === "Login" ? (
              <>
                Create an account?{" "}
                <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setState("Sign Up")}>
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setState("Login")}>
                  Login here
                </span>
              </>

              
            )}

{state === "Login" && (
            <p className="text-center">
              <span
                className="text-danger"
                style={{ cursor: "pointer", fontSize: "0.9rem" }}
                onClick={() => setShowForgotModal(true)}
              >
                Forgot Password?
              </span>
            </p>
          )}
          </p>

          <a href="adminlogin" className="link-warning"></a>

          
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reset Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowForgotModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  name="name"
                  value={forgotData.name}
                  onChange={forgotChangeHandler}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email address"
                  name="email"
                  value={forgotData.email}
                  onChange={forgotChangeHandler}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="New password"
                  name="newPassword"
                  value={forgotData.newPassword}
                  onChange={forgotChangeHandler}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowForgotModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleForgotPassword}>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer theme="dark" />
    </>
  );
};

export default LoginSignup;
