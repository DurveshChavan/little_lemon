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
            <div className="footer-logo">
              <span className="logo-text">🍋 Little Lemon</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#specials">Specials</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#reservations">Reservations</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>2395 Maldove Way</li>
              <li>Chicago, Illinois</li>
              <li><a href="tel:(629)-243-6827">(629)-243-6827</a></li>
              <li><a href="mailto:info@littlelemon.com">info@littlelemon.com</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Opening Hours</h4>
            <ul className="footer-links">
              <li><strong>Monday - Thursday:</strong><br />11:00 AM - 10:00 PM</li>
              <li><strong>Friday - Saturday:</strong><br />11:00 AM - 11:00 PM</li>
              <li><strong>Sunday:</strong><br />12:00 PM - 9:00 PM</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                📘 Facebook
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                📷 Instagram
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                📺 YouTube
              </a>
            </div>
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
