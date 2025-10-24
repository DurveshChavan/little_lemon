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

  test('renders contact information', () => {
    render(<Footer />);
    
    expect(screen.getByText(/123 mediterranean way/i)).toBeInTheDocument();
    expect(screen.getByText(/chicago, il 60601/i)).toBeInTheDocument();
    expect(screen.getByText(/\(312\) 555-0123/i)).toBeInTheDocument();
    expect(screen.getByText(/info@littlelemon\.com/i)).toBeInTheDocument();
  });

  test('renders opening hours', () => {
    render(<Footer />);
    
    expect(screen.getByText(/monday - thursday/i)).toBeInTheDocument();
    expect(screen.getByText(/friday - saturday/i)).toBeInTheDocument();
    expect(screen.getByText(/sunday/i)).toBeInTheDocument();
  });

  test('renders quick links', () => {
    render(<Footer />);
    
    const homeLink = screen.getByRole('link', { name: /go to home section/i });
    const aboutLink = screen.getByRole('link', { name: /go to about section/i });
    const menuLink = screen.getByRole('link', { name: /go to menu section/i });
    const reservationsLink = screen.getByRole('link', { name: /go to reservations section/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(menuLink).toBeInTheDocument();
    expect(reservationsLink).toBeInTheDocument();
  });

  test('renders copyright information', () => {
    render(<Footer />);
    
    expect(screen.getByText(/© 2024 little lemon restaurant/i)).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  test('links have proper href attributes', () => {
    render(<Footer />);
    
    const homeLink = screen.getByRole('link', { name: /go to home section/i });
    const aboutLink = screen.getByRole('link', { name: /go to about section/i });
    
    expect(homeLink).toHaveAttribute('href', '#home');
    expect(aboutLink).toHaveAttribute('href', '#about');
  });
});
