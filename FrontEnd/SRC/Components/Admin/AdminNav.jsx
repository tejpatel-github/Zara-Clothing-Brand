import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Assets/logo.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

 
  const checkAuthAndNavigate = (path) => {
    if (localStorage.getItem("auth-token")) {
      navigate(path);
    } else {
      alert("Please login first!");
      navigate("/Adminlogin");
    }
  };

 
  const toggleNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    navbar.classList.toggle("show");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" onClick={() => checkAuthAndNavigate("/")}>
          <img src={logo} alt="logo" width="40" height="40"  className="me-2" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link" onClick={() => checkAuthAndNavigate("/admin")}>
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button className=" nav-link" onClick={() => checkAuthAndNavigate("/AdminManage")}>
                Manage
              </button>
            </li>
            <li className="nav-item">
              <button className=" nav-link" onClick={() => checkAuthAndNavigate("/AdminProduct")}>
                Product
              </button>
            </li>
            <li className="nav-item">
              <button className=" nav-link" onClick={() => checkAuthAndNavigate("/AdminReturn")}>
                Return Orders
              </button>
            </li>
          </ul>
          <div className="d-flex">
            {localStorage.getItem("auth-token") ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login" className="btn btn-outline-primary">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
