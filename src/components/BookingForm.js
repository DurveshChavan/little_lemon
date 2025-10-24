import React, { useState, useReducer } from 'react';

// Initial form state
const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
  occasion: '',
  specialRequests: '',
  errors: {}
};

// Form validation rules
const validateField = (name, value) => {
  const errors = {};
  
  switch (name) {
    case 'firstName':
    case 'lastName':
      if (!value.trim()) {
        errors[name] = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
      } else if (value.trim().length < 2) {
        errors[name] = `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
      } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
        errors[name] = `${name === 'firstName' ? 'First' : 'Last'} name can only contain letters and spaces`;
      }
      break;
      
    case 'email':
      if (!value.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        errors.email = 'Please enter a valid email address';
      }
      break;
      
    case 'phone':
      if (!value.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^[\d\s\-\+\(\)]+$/.test(value.trim())) {
        errors.phone = 'Please enter a valid phone number';
      } else if (value.replace(/\D/g, '').length < 10) {
        errors.phone = 'Phone number must be at least 10 digits';
      }
      break;
      
    case 'date':
      if (!value) {
        errors.date = 'Date is required';
      } else {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          errors.date = 'Date cannot be in the past';
        } else if (selectedDate > new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)) {
          errors.date = 'Reservations can only be made up to 30 days in advance';
        }
      }
      break;
      
    case 'time':
      if (!value) {
        errors.time = 'Time is required';
      } else {
        const selectedTime = value;
        const [hours] = selectedTime.split(':').map(Number);
        if (hours < 11 || hours > 22) {
          errors.time = 'Reservations are available between 11:00 AM and 10:00 PM';
        }
      }
      break;
      
    case 'guests':
      if (!value) {
        errors.guests = 'Number of guests is required';
      } else {
        const numGuests = parseInt(value);
        if (numGuests < 1) {
          errors.guests = 'At least 1 guest is required';
        } else if (numGuests > 10) {
          errors.guests = 'Maximum 10 guests per reservation';
        }
      }
      break;
      
    case 'occasion':
      if (!value) {
        errors.occasion = 'Please select an occasion';
      }
      break;
      
    default:
      break;
  }
  
  return errors;
};

// Form reducer for state management
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      const { name, value } = action.payload;
      const fieldErrors = validateField(name, value);
      const newErrors = { ...state.errors };
      
      if (fieldErrors[name]) {
        newErrors[name] = fieldErrors[name];
      } else {
        delete newErrors[name];
      }
      
      return {
        ...state,
        [name]: value,
        errors: newErrors
      };
      
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };
      
    case 'RESET_FORM':
      return initialFormState;
      
    default:
      return state;
  }
};

const BookingForm = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', payload: { name, value } });
  };

  // Validate entire form
  const validateForm = () => {
    const errors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'date', 'time', 'guests', 'occasion'];
    
    requiredFields.forEach(field => {
      const fieldErrors = validateField(field, formState[field]);
      if (fieldErrors[field]) {
        errors[field] = fieldErrors[field];
      }
    });
    
    dispatch({ type: 'SET_ERRORS', payload: errors });
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    if (!validateForm()) {
      setIsSubmitting(false);
      setSubmitMessage('Please correct the errors below and try again.');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      setSubmitMessage('Reservation confirmed! We look forward to seeing you.');
      dispatch({ type: 'RESET_FORM' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      setSubmitMessage('Sorry, there was an error processing your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate time options
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 11; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 22 && minute > 0) break;
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  // Generate guest options
  const generateGuestOptions = () => {
    const guests = [];
    for (let i = 1; i <= 10; i++) {
      guests.push(i);
    }
    return guests;
  };

  return (
    <section className="booking-section" id="reservations" aria-labelledby="booking-title">
      <div className="container">
        <div className="booking-container">
          <h2 id="booking-title" className="booking-title">Reserve a Table</h2>
          
          {submitMessage && (
            <div 
              className={`submit-message ${submitMessage.includes('confirmed') ? 'success' : 'error'}`}
              role="alert"
              aria-live="polite"
            >
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate aria-labelledby="booking-title">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  className={`form-input ${formState.errors.firstName ? 'error' : ''}`}
                  aria-describedby={formState.errors.firstName ? 'firstName-error' : undefined}
                  aria-invalid={!!formState.errors.firstName}
                  required
                />
                {formState.errors.firstName && (
                  <span id="firstName-error" className="form-error" role="alert">
                    {formState.errors.firstName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleInputChange}
                  className={`form-input ${formState.errors.lastName ? 'error' : ''}`}
                  aria-describedby={formState.errors.lastName ? 'lastName-error' : undefined}
                  aria-invalid={!!formState.errors.lastName}
                  required
                />
                {formState.errors.lastName && (
                  <span id="lastName-error" className="form-error" role="alert">
                    {formState.errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className={`form-input ${formState.errors.email ? 'error' : ''}`}
                  aria-describedby={formState.errors.email ? 'email-error' : undefined}
                  aria-invalid={!!formState.errors.email}
                  required
                />
                {formState.errors.email && (
                  <span id="email-error" className="form-error" role="alert">
                    {formState.errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  className={`form-input ${formState.errors.phone ? 'error' : ''}`}
                  aria-describedby={formState.errors.phone ? 'phone-error' : undefined}
                  aria-invalid={!!formState.errors.phone}
                  required
                />
                {formState.errors.phone && (
                  <span id="phone-error" className="form-error" role="alert">
                    {formState.errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formState.date}
                  onChange={handleInputChange}
                  className={`form-input ${formState.errors.date ? 'error' : ''}`}
                  aria-describedby={formState.errors.date ? 'date-error' : undefined}
                  aria-invalid={!!formState.errors.date}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  required
                />
                {formState.errors.date && (
                  <span id="date-error" className="form-error" role="alert">
                    {formState.errors.date}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  Time *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formState.time}
                  onChange={handleInputChange}
                  className={`form-select ${formState.errors.time ? 'error' : ''}`}
                  aria-describedby={formState.errors.time ? 'time-error' : undefined}
                  aria-invalid={!!formState.errors.time}
                  required
                >
                  <option value="">Select a time</option>
                  {generateTimeOptions().map(time => (
                    <option key={time} value={time}>
                      {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </option>
                  ))}
                </select>
                {formState.errors.time && (
                  <span id="time-error" className="form-error" role="alert">
                    {formState.errors.time}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="guests" className="form-label">
                  Number of Guests *
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formState.guests}
                  onChange={handleInputChange}
                  className={`form-select ${formState.errors.guests ? 'error' : ''}`}
                  aria-describedby={formState.errors.guests ? 'guests-error' : undefined}
                  aria-invalid={!!formState.errors.guests}
                  required
                >
                  <option value="">Select number of guests</option>
                  {generateGuestOptions().map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
                {formState.errors.guests && (
                  <span id="guests-error" className="form-error" role="alert">
                    {formState.errors.guests}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="occasion" className="form-label">
                  Occasion *
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formState.occasion}
                  onChange={handleInputChange}
                  className={`form-select ${formState.errors.occasion ? 'error' : ''}`}
                  aria-describedby={formState.errors.occasion ? 'occasion-error' : undefined}
                  aria-invalid={!!formState.errors.occasion}
                  required
                >
                  <option value="">Select an occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business</option>
                  <option value="date">Date Night</option>
                  <option value="celebration">Celebration</option>
                  <option value="other">Other</option>
                </select>
                {formState.errors.occasion && (
                  <span id="occasion-error" className="form-error" role="alert">
                    {formState.errors.occasion}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests" className="form-label">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formState.specialRequests}
                onChange={handleInputChange}
                className="form-textarea"
                rows="4"
                placeholder="Any special dietary requirements, accessibility needs, or other requests..."
                aria-describedby="specialRequests-help"
              />
              <small id="specialRequests-help" className="form-help">
                Please let us know about any dietary restrictions, accessibility needs, or other special requirements.
              </small>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                aria-describedby="submit-help"
              >
                {isSubmitting ? 'Processing...' : 'Reserve Table'}
              </button>
              <small id="submit-help" className="form-help">
                By submitting this form, you agree to our reservation policy.
              </small>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
