import React from "react";
import NavigationBar from "./Navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";  // Ensure Bootstrap JS is loaded
import Footer from "./footer.jsx";

function Home() {
  return (
    <>
      <NavigationBar />
      <div className="main-Container">
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src="https://marketplace.canva.com/EAFVHstxnwk/1/0/1600w/canva-beige-aesthetic-exclusive-fashion-wear-collection-clothing-banner-BZb4KkCdNP0.jpg" className="d-block w-100" alt="Slide 1" />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="https://wallpapers.com/images/hd/zara-fashion-chain-store-m4g0gru4j3a7ixvs.jpg" className="d-block w-100" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/08/03/12/zaradress0308.jpg" className="d-block w-100" alt="Slide 3" />
            </div>
          </div>
          {/* Previous Button */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          {/* Next Button */}
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="main-header">
          <a className="btn btn-info" href="/Store">Start Shopping <i class="fas fa-arrow-right"></i> </a>
      </div>

      <div className="home-ad">
        <div>
        <img src="https://static.zara.net/assets/public/119d/a3a1/a6aa49b69e3a/770cc836595c/T0668840001-p/T0668840001-p.jpg?ts=1740580818105&w=593" alt="Ad" />

        </div>
        <div>
        <img src="https://static.zara.net/assets/public/dce0/a7e3/84ed4b5b81b7/25d2d660af29/T0070611100-p/T0070611100-p.jpg?ts=1740580818389&w=593" alt="Ad" />

        </div>
      </div>

      <div className="header">
      <iframe 
  width="100%" 
  height="400" 
  src="https://www.youtube.com/embed/OouUgFMkMD0?autoplay=1&mute=1&loop=1&playlist=OouUgFMkMD0" 
  title="YouTube video player" 
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  style={{ display: "block", width: "100%", maxWidth: "100%", margin: "0 0 10px" }}
></iframe>




      </div>

      <Footer/>
    </>
  );
}

export default Home;
