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
            <a href="#about" aria-label="Go to about section">About</a>
            <a href="#menu" aria-label="Go to menu section">Menu</a>
            <a href="#reservations" aria-label="Go to reservations section">Reservations</a>
            <a href="#order-online" aria-label="Go to order online section">Order Online</a>
            <a href="#login" aria-label="Go to login section">Login</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
