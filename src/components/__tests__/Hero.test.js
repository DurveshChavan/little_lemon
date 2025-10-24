import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../Hero';

describe('Hero Component', () => {
  test('renders Little Lemon title', () => {
    render(<Hero />);
    const title = screen.getByRole('heading', { name: /little lemon/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Little Lemon');
  });

  test('renders Chicago subtitle', () => {
    render(<Hero />);
    const subtitle = screen.getByRole('heading', { name: /chicago/i });
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent('Chicago');
  });

  test('renders description text', () => {
    render(<Hero />);
    const description = screen.getByText(/we are a family owned mediterranean restaurant/i);
    expect(description).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<Hero />);
    
    const section = screen.getByRole('banner', { name: /little lemon/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'home');
  });

  test('has proper heading hierarchy', () => {
    render(<Hero />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2 = screen.getByRole('heading', { level: 2 });
    
    expect(h1).toHaveTextContent('Little Lemon');
    expect(h2).toHaveTextContent('Chicago');
  });
});
