import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Specials from './components/Specials';
import Testimonials from './components/Testimonials';
import About from './components/About';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Generate available times - managed from parent component
  const availableTimes = useMemo(() => {
    const times = [];
    for (let hour = 11; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 22 && minute > 0) break;
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  }, []);

  // Generate guest options - managed from parent component
  const guestOptions = useMemo(() => {
    const guests = [];
    for (let i = 1; i <= 10; i++) {
      guests.push(i);
    }
    return guests;
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Specials />
        <Testimonials />
        <About />
        <BookingForm 
          availableTimes={availableTimes}
          guestOptions={guestOptions}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
