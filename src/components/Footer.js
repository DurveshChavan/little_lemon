import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Little Lemon</h4>
            <p>
              A family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Opening Hours</h4>
            <p>
              <strong>Monday - Thursday:</strong> 11:00 AM - 10:00 PM<br />
              <strong>Friday - Saturday:</strong> 11:00 AM - 11:00 PM<br />
              <strong>Sunday:</strong> 12:00 PM - 9:00 PM
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <p>
              <a href="#home" aria-label="Go to home section">Home</a><br />
              <a href="#reservations" aria-label="Go to reservations section">Reservations</a>
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Little Lemon Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
