import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Column 1 */}
          <div className="col-md-4 mb-4">
            <h5>ZARA</h5>
            <ul className="list-unstyled">
              <li><a href="/Order" className="text-white text-decoration-none" target="_blank">Returns</a></li>
              <li><a href="https://www.zara.com/ca/en/home-event-8-mkt2637.html?v1=2528618&regionGroupId=124" className="text-white text-decoration-none" target="_blank">Careers</a></li>
              <li><a href="/Order" className="text-white text-decoration-none" target="_blank">Records</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="col-md-4 mb-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><a href="mailto:tirth@gmail.com" className="text-white text-decoration-none">Email: tirth@gmail.com</a></li>
              <li><a href="tel:+1234567890" className="text-white text-decoration-none">Phone: +1 234 567 890</a></li>
              <li><a href="https://www.google.com/maps/place/123+Main+St,+Kitchener,+ON" className="text-white text-decoration-none" target="_blank">Address: 123 Main Street, Kitchener</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-4 mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="https://www.facebook.com/Zara" className="text-white" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
              <a href="https://twitter.com/ZARA" className="text-white" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
              <a href="https://www.instagram.com/zara/" className="text-white" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
              <a href="https://www.linkedin.com/company/zara/" className="text-white" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-4">
          <p className="mb-0">&copy; 2025 Zara. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
