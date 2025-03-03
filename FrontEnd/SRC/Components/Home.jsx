import React from "react";
import NavigationBar from "./Navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";  // Ensure Bootstrap JS is loaded
import Footer from "./footer.jsx";

function Home() {
  return (
    <>
      <NavigationBar />
      

      <Footer/>
    </>
  );
}

export default Home;
