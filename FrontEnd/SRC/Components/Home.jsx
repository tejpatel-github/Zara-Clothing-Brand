import React, { useEffect, useState } from "react";
import NavigationBar from "./Navbar.jsx";
import { Buffer } from "buffer";

function Home() {
  
  return (
    <>
      <NavigationBar />
      <div>
        <h1 className="center">Home</h1>
      </div>
    </>
  );
}

export default Home;
