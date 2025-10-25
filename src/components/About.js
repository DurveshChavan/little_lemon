import React from 'react';
import restaurantInteriorImage from '../assets/images/restaurant-interior.png';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Little Lemon</h2>
            <p>
              Based in Chicago, Illinois, Little Lemon is a family-owned Mediterranean restaurant, 
              focused on traditional recipes served with a modern twist. The chefs draw inspiration 
              from Italian, Greek, and Turkish culture and have a menu of 12-15 items that they rotate seasonally.
            </p>
            <p>
              The restaurant has a rustic and relaxed atmosphere with moderate prices, making it a 
              popular place for a meal any time of the day. Little Lemon is owned by two Italian brothers, 
              Mario and Adrian, who moved to the United States to pursue their shared dream of owning a restaurant.
            </p>
            <div className="about-features">
              <div className="feature">
                <span className="feature-icon">🍽️</span>
                <h4>Traditional Recipes</h4>
                <p>Authentic Mediterranean flavors passed down through generations</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🌿</span>
                <h4>Fresh Ingredients</h4>
                <p>Locally sourced, seasonal ingredients for the best taste</p>
              </div>
              <div className="feature">
                <span className="feature-icon">👨‍🍳</span>
                <h4>Expert Chefs</h4>
                <p>Skilled chefs with years of Mediterranean cooking experience</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="about-image-container">
              <img 
                src={restaurantInteriorImage} 
                alt="Little Lemon restaurant interior showing cozy dining atmosphere"
                className="restaurant-interior-image"
              />
              <div className="interior-overlay">
                <span className="interior-text">Family-Owned Since 1995</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
