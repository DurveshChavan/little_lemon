import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle smooth scrolling with header offset
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 80; // Approximate header height
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.header-content')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-content">
          <a href="/" className="logo" aria-label="Little Lemon Restaurant">
            Little Lemon
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <nav 
            className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`} 
            role="navigation" 
            aria-label="Main navigation"
          >
            <a 
              href="#home" 
              aria-label="Go to home section"
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
            <a 
              href="#specials" 
              aria-label="Go to specials section"
              onClick={(e) => handleNavClick(e, 'specials')}
            >
              Specials
            </a>
            <a 
              href="#testimonials" 
              aria-label="Go to testimonials section"
              onClick={(e) => handleNavClick(e, 'testimonials')}
            >
              Reviews
            </a>
            <a 
              href="#about" 
              aria-label="Go to about section"
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
            <a 
              href="#reservations" 
              aria-label="Go to reservations section"
              onClick={(e) => handleNavClick(e, 'reservations')}
            >
              Reservations
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
