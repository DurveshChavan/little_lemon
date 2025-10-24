import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BookingForm from '../BookingForm';

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('BookingForm Component', () => {
  const user = userEvent.setup();

  test('renders form with all required fields', () => {
    render(<BookingForm />);
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<BookingForm />);
    
    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/time is required/i)).toBeInTheDocument();
      expect(screen.getByText(/number of guests is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select an occasion/i)).toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    render(<BookingForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('validates phone number format', async () => {
    render(<BookingForm />);
    
    const phoneInput = screen.getByLabelText(/phone number/i);
    await user.type(phoneInput, '123');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/phone number must be at least 10 digits/i)).toBeInTheDocument();
    });
  });

  test('validates date is not in the past', async () => {
    render(<BookingForm />);
    
    const dateInput = screen.getByLabelText(/date/i);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    
    await user.type(dateInput, yesterdayString);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/date cannot be in the past/i)).toBeInTheDocument();
    });
  });

  test('validates guest count limits', async () => {
    render(<BookingForm />);
    
    const guestsSelect = screen.getByLabelText(/number of guests/i);
    await user.selectOptions(guestsSelect, '11');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/maximum 10 guests per reservation/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    render(<BookingForm />);
    
    // Fill in all required fields
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '1234567890');
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    await user.type(screen.getByLabelText(/date/i), tomorrowString);
    
    await user.selectOptions(screen.getByLabelText(/time/i), '12:00');
    await user.selectOptions(screen.getByLabelText(/number of guests/i), '2');
    await user.selectOptions(screen.getByLabelText(/occasion/i), 'birthday');

    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/reservation confirmed/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('has proper accessibility attributes', () => {
    render(<BookingForm />);
    
    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('aria-labelledby', 'booking-title');
    expect(form).toHaveAttribute('noValidate');

    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toHaveAttribute('required');
    expect(firstNameInput).toHaveAttribute('aria-invalid', 'false');
  });

  test('shows error states for invalid fields', async () => {
    render(<BookingForm />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.type(firstNameInput, 'a');
    await user.tab();

    await waitFor(() => {
      expect(firstNameInput).toHaveClass('error');
      expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  test('generates correct time options', () => {
    render(<BookingForm />);
    
    const timeSelect = screen.getByLabelText(/time/i);
    const options = Array.from(timeSelect.options).map(option => option.value);
    
    expect(options).toContain('11:00');
    expect(options).toContain('12:00');
    expect(options).toContain('22:00');
    expect(options).not.toContain('22:30');
  });

  test('generates correct guest options', () => {
    render(<BookingForm />);
    
    const guestsSelect = screen.getByLabelText(/number of guests/i);
    const options = Array.from(guestsSelect.options).map(option => option.value);
    
    expect(options).toContain('1');
    expect(options).toContain('5');
    expect(options).toContain('10');
    expect(options).not.toContain('11');
  });
});
