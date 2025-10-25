import React from 'react';
import heroImage from '../assets/images/hero-restaurant.png';

const Hero = () => {
  return (
    <section className="hero" id="home" role="banner" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 id="hero-title">Little Lemon</h1>
            <h2>Chicago</h2>
            <p className="hero-description">
              We are a family owned Mediterranean restaurant, located on Maldove Street in Chicago, Illinois. We focus
              on traditional recipes served with a modern twist.
            </p>
            <a href="#reservations" className="cta-button">
              Reserve a Table
            </a>
          </div>
          <div className="hero-image">
            <div className="hero-image-container">
              <img 
                src={heroImage} 
                alt="Little Lemon restaurant interior showing Mediterranean cuisine"
                className="hero-restaurant-image"
              />
              <div className="image-overlay">
                <span className="image-text">Mediterranean Cuisine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
