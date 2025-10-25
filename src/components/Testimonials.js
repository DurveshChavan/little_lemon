import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "The Greek salad was absolutely amazing! Fresh ingredients and perfect seasoning. Will definitely come back!",
      image: "👩"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "Best Mediterranean food in Chicago! The atmosphere is cozy and the staff is incredibly friendly.",
      image: "👨"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      text: "Little Lemon has become our go-to restaurant. The bruschetta is to die for and the service is outstanding.",
      image: "👩"
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      text: "Authentic Mediterranean flavors with a modern twist. The lemon dessert was the perfect ending to our meal.",
      image: "👨"
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="customer-info">
                  <span className="customer-avatar">{testimonial.image}</span>
                  <div className="customer-details">
                    <h4>{testimonial.name}</h4>
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="star">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
