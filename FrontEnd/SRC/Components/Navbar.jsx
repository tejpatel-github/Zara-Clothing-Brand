import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "@fortawesome/fontawesome-free/css/all.min.css";


function NavigationBar() {
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  // Manually toggle navbar when clicking the button
  const toggleNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    } else {
      navbar.classList.add("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="logo" width="40" height="40" className="me-2" />
          <span>ZARA</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar} // Manually toggle navbar
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Store">Store</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">Wishlist</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cart">Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/OrderPage">Order</Link>
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

export default NavigationBar;
