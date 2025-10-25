import React from 'react';
import greekSaladImage from '../assets/images/greek-salad.png';
import bruschettaImage from '../assets/images/bruschetta.png';
import lemonDessertImage from '../assets/images/lemon-dessert.png';

const Specials = () => {
  const specials = [
    {
      id: 1,
      name: "Greek Salad",
      price: "$12.99",
      description: "Refreshing salad, made with tomato, lettuce, feta cheese, and olives. Dressed with salt, hot pepper, and olive oil.",
      image: greekSaladImage,
      alt: "Fresh Greek Salad with feta cheese and olives"
    },
    {
      id: 2,
      name: "Bruschetta",
      price: "$16.99",
      description: "Toasted bread, topped with tomato, prosciutto, and cheese. Seasoned with salt and olive oil.",
      image: bruschettaImage,
      alt: "Traditional Italian Bruschetta with fresh toppings"
    },
    {
      id: 3,
      name: "Lemon Dessert",
      price: "$8.50",
      description: "Fresh baked lemon bread coated in salt and sugar. Powdered in citrus and lemon zest.",
      image: lemonDessertImage,
      alt: "Delicious lemon dessert with citrus zest"
    }
  ];

  return (
    <section className="specials-section" id="specials">
      <div className="container">
        <div className="specials-header">
          <h2>This Week's Specials</h2>
          <a href="#" className="menu-button">Online Menu</a>
        </div>
        
        <div className="specials-grid">
          {specials.map((special) => (
            <div key={special.id} className="special-card">
              <div className="special-image">
                <img 
                  src={special.image} 
                  alt={special.alt}
                  className="food-image"
                />
              </div>
              <div className="special-content">
                <div className="special-header">
                  <h3>{special.name}</h3>
                  <span className="special-price">{special.price}</span>
                </div>
                <p className="special-description">{special.description}</p>
                <button className="order-button">Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;
