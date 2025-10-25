import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders restaurant information', () => {
    render(<Footer />);
    
    expect(screen.getByText('Little Lemon')).toBeInTheDocument();
    expect(screen.getByText(/family-owned mediterranean restaurant/i)).toBeInTheDocument();
  });

  test('renders opening hours information', () => {
    render(<Footer />);
    
    expect(screen.getByText(/monday - thursday/i)).toBeInTheDocument();
    expect(screen.getByText(/friday - saturday/i)).toBeInTheDocument();
    expect(screen.getByText(/sunday/i)).toBeInTheDocument();
  });


  test('renders quick links', () => {
    render(<Footer />);
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    const reservationsLink = screen.getByRole('link', { name: /reservations/i });

    expect(homeLink).toBeInTheDocument();
    expect(reservationsLink).toBeInTheDocument();
  });

  test('renders copyright information', () => {
    render(<Footer />);
    
    expect(screen.getByText(/© 2025 little lemon restaurant/i)).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  test('links have proper href attributes', () => {
    render(<Footer />);
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    const reservationsLink = screen.getByRole('link', { name: /reservations/i });
    
    expect(homeLink).toHaveAttribute('href', '#home');
    expect(reservationsLink).toHaveAttribute('href', '#reservations');
  });
});
