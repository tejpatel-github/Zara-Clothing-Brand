import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Register from "./Components/signup.jsx";
import AdminLogin from "./Components/Admin/AdminLogin.jsx";
import AdminDashboard from "./Components/Admin/AsminDash.jsx";




const NotFound = () => <h1>Error 404!</h1>; 

function LinksSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Register />} />
        <Route path="/AdminLogin" element={<AdminLogin/>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default LinksSetup;
