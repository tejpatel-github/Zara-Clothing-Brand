import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Assets/logo.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

function AdminNav() {
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const isAuthenticated = localStorage.getItem("auth-token");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="logo" width="40" height="40" className="me-2" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isNavbarOpen}
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to={isAuthenticated ? "/Admin" : "/adminlogin"}
                className="nav-link"
                onClick={() => {
                  if (!isAuthenticated) alert("Please login first!");
                }}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={isAuthenticated ? "/adminmanage" : "/adminlogin"}
                className="nav-link"
                onClick={() => {
                  if (!isAuthenticated) alert("Please login first!");
                }}
              >
                Manage
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={isAuthenticated ? "/adminproduct" : "/adminlogin"}
                className="nav-link"
                onClick={() => {
                  if (!isAuthenticated) alert("Please login first!");
                }}
              >
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={isAuthenticated ? "/adminreturn" : "/adminlogin"}
                className="nav-link"
                onClick={() => {
                  if (!isAuthenticated) alert("Please login first!");
                }}
              >
                Return Orders
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {isAuthenticated ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/adminlogin" className="btn btn-outline-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
