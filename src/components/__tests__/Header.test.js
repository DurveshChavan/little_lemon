import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header Component', () => {
  test('renders Little Lemon logo', () => {
    render(<Header />);
    const logo = screen.getByText('Little Lemon');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('aria-label', 'Little Lemon Restaurant');
  });

  test('renders navigation links', () => {
    render(<Header />);
    
    const homeLink = screen.getByRole('link', { name: /go to home section/i });
    const reservationsLink = screen.getByRole('link', { name: /go to reservations section/i });

    expect(homeLink).toBeInTheDocument();
    expect(reservationsLink).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    
    expect(header).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });

  test('navigation links have proper href attributes', () => {
    render(<Header />);
    
    const homeLink = screen.getByRole('link', { name: /go to home section/i });
    const reservationsLink = screen.getByRole('link', { name: /go to reservations section/i });
    
    expect(homeLink).toHaveAttribute('href', '#home');
    expect(reservationsLink).toHaveAttribute('href', '#reservations');
  });
});
