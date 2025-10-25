import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BookingForm from '../BookingForm';

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
       args[0].includes('Warning: An update to BookingForm inside a test was not wrapped in act(...)'))
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
  // Mock props for testing
  const mockAvailableTimes = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
  const mockGuestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  test('renders form with all required fields', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
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
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    await userEvent.click(submitButton);

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
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await act(async () => {
      await userEvent.type(emailInput, 'invalid-email');
      await userEvent.tab();
    });

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('validates phone number format', async () => {
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
    const phoneInput = screen.getByLabelText(/phone number/i);
    await act(async () => {
      await userEvent.type(phoneInput, '123');
      await userEvent.tab();
    });

    await waitFor(() => {
      expect(screen.getByText(/phone number must be at least 10 digits/i)).toBeInTheDocument();
    });
  });

  test('validates date is not in the past', async () => {
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
    const dateInput = screen.getByLabelText(/date/i);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    
    await act(async () => {
      await userEvent.type(dateInput, yesterdayString);
      await userEvent.tab();
    });

    await waitFor(() => {
      expect(screen.getByText(/date cannot be in the past/i)).toBeInTheDocument();
    });
  });

  test('validates guest count limits', async () => {
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
    const guestsSelect = screen.getByLabelText(/number of guests/i);
    // Test with maximum allowed guests (10)
    await act(async () => {
      await userEvent.selectOptions(guestsSelect, '10');
      await userEvent.tab();
    });

    // Should not show error for valid selection
    expect(screen.queryByText(/maximum 10 guests per reservation/i)).not.toBeInTheDocument();
    
    // Test with minimum guests (1)
    await act(async () => {
      await userEvent.selectOptions(guestsSelect, '1');
      await userEvent.tab();
    });

    // Should not show error for valid selection
    expect(screen.queryByText(/at least 1 guest is required/i)).not.toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
    // Fill in all required fields
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/first name/i), 'John');
      await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
      await userEvent.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
      await userEvent.type(screen.getByLabelText(/phone number/i), '1234567890');
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = tomorrow.toISOString().split('T')[0];
      await userEvent.type(screen.getByLabelText(/date/i), tomorrowString);
      
      await userEvent.selectOptions(screen.getByLabelText(/time/i), '12:00');
      await userEvent.selectOptions(screen.getByLabelText(/number of guests/i), '2');
      await userEvent.selectOptions(screen.getByLabelText(/occasion/i), 'birthday');

      const submitButton = screen.getByRole('button', { name: /reserve table/i });
      await userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/reservation confirmed/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('has proper accessibility attributes', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('aria-labelledby', 'booking-title');
    expect(form).toHaveAttribute('noValidate');

    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toHaveAttribute('required');
    expect(firstNameInput).toHaveAttribute('aria-invalid', 'false');
  });

  test('shows error states for invalid fields', async () => {
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    await act(async () => {
      await userEvent.type(firstNameInput, 'a');
      await userEvent.tab();
    });

    await waitFor(() => {
      expect(firstNameInput).toHaveClass('error');
      expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  test('generates correct time options', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
    const timeSelect = screen.getByLabelText(/time/i);
    const options = Array.from(timeSelect.options).map(option => option.value);
    
    expect(options).toContain('11:00');
    expect(options).toContain('12:00');
    expect(options).toContain('22:00');
    expect(options).not.toContain('22:30');
  });

  test('generates correct guest options', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} guestOptions={mockGuestOptions} />);
    
    const guestsSelect = screen.getByLabelText(/number of guests/i);
    const options = Array.from(guestsSelect.options).map(option => option.value);
    
    expect(options).toContain('1');
    expect(options).toContain('5');
    expect(options).toContain('10');
    expect(options).not.toContain('11');
  });
});
