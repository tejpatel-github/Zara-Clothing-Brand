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

        <button className="btn btn-primary w-100 mb-3" onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>

        <p className="text-center">
          {state === "Login" ? (
            <>Create an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setState("Sign Up")}>Click here</span></>
          ) : (
            <>Already have an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setState("Login")}>Login here</span></>
          )}
        </p>
        <p className="text-center mt-2">
          Admin Login <a href="/Adminlogin" className="text-decoration-none">Click here</a>
        </p>
      </div>
      <ToastContainer theme="dark" />
      
    </div>
  );
};

export default LoginSignup;
