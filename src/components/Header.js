import React from 'react';

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-content">
          <a href="/" className="logo" aria-label="Little Lemon Restaurant">
            Little Lemon
          </a>
          <nav className="nav" role="navigation" aria-label="Main navigation">
            <a href="#home" aria-label="Go to home section">Home</a>
            <a href="#reservations" aria-label="Go to reservations section">Reservations</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
