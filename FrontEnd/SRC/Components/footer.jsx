import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Footer Column 1 */}
          <div className="col-md-4">
            <h5>ZARA</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">About Us</a></li>
              <li><a href="#" className="text-white">Careers</a></li>
              <li><a href="#" className="text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-white">Terms of Service</a></li>
            </ul>
          </div>

          {/* Footer Column 2 */}
          <div className="col-md-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><a href="mailto:info@example.com" className="text-white">Email: tirth@gmail.com</a></li>
              <li><a href="tel:+1234567890" className="text-white">Phone: +1 234 567 890</a></li>
              <li><a href="#" className="text-white">Address: 123 Main Street, Kitcheners</a></li>
            </ul>
          </div>

          {/* Footer Column 3 */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Facebook</a></li>
              <li><a href="#" className="text-white">Twitter</a></li>
              <li><a href="#" className="text-white">Instagram</a></li>
              <li><a href="#" className="text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2025 Company Name. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
