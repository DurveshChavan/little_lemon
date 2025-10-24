# Little Lemon Restaurant Booking Web App

A modern, responsive web application for the Little Lemon restaurant that allows customers to book tables online. Built with React and designed with accessibility and mobile-first principles.

## Features

- **Responsive Design**: Optimized for both mobile and desktop devices
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and semantic HTML
- **Form Validation**: Comprehensive client-side validation with real-time feedback
- **Modern UI/UX**: Clean, intuitive interface following Little Lemon's brand guidelines
- **Unit Tests**: Comprehensive test coverage for all components
- **Error Handling**: Meaningful error messages and edge case handling

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Responsive Design](#responsive-design)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd little-lemon-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## Usage

### Making a Reservation

1. **Navigate to the booking form** - Scroll down to the "Reserve a Table" section
2. **Fill in your details**:
   - First Name and Last Name (required)
   - Email address (required)
   - Phone number (required)
   - Preferred date (required, cannot be in the past)
   - Preferred time (required, between 11:00 AM - 10:00 PM)
   - Number of guests (required, 1-10 guests)
   - Occasion (required)
   - Special requests (optional)
3. **Submit the form** - Click "Reserve Table" to confirm your reservation

### Form Validation

The form includes comprehensive validation:
- **Required fields**: All mandatory fields must be completed
- **Email format**: Valid email address required
- **Phone number**: Minimum 10 digits required
- **Date restrictions**: Cannot book in the past or more than 30 days ahead
- **Time restrictions**: Reservations available 11:00 AM - 10:00 PM
- **Guest limits**: 1-10 guests per reservation

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage

The project includes comprehensive unit tests for:
- Component rendering and structure
- Form validation logic
- User interactions
- Accessibility features
- Error handling

## Accessibility

This application follows WCAG 2.1 guidelines and includes:

- **Semantic HTML**: Proper use of headings, landmarks, and form elements
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: Sufficient contrast ratios for text and interactive elements
- **Screen Reader Support**: Compatible with assistive technologies

### Accessibility Features

- Form fields have proper labels and descriptions
- Error messages are announced to screen readers
- Navigation is keyboard accessible
- Color is not the only means of conveying information
- Interactive elements have sufficient touch targets (44px minimum)

## Responsive Design

The application is fully responsive and optimized for:

- **Mobile devices** (320px - 768px)
- **Tablets** (768px - 1024px)
- **Desktop** (1024px+)

### Responsive Features

- **Flexible Grid Layout**: Adapts to different screen sizes
- **Touch-Friendly Interface**: Large buttons and touch targets
- **Readable Typography**: Scalable text that remains legible
- **Optimized Images**: Responsive images with proper sizing
- **Mobile Navigation**: Collapsible navigation for smaller screens

## Project Structure

```
src/
├── components/
│   ├── Header.js              # Navigation header
│   ├── Hero.js                # Hero section
│   ├── BookingForm.js         # Main booking form
│   ├── Footer.js              # Footer with contact info
│   └── __tests__/             # Component tests
├── App.js                     # Main application component
├── App.css                    # Application styles
├── index.js                   # Application entry point
└── index.css                  # Global styles
```

### Key Components

- **Header**: Navigation with accessibility features
- **Hero**: Restaurant branding and introduction
- **BookingForm**: Comprehensive form with validation
- **Footer**: Contact information and links

## Form Validation Details

### Client-Side Validation

The booking form includes real-time validation for:

1. **Name Fields**
   - Required field validation
   - Minimum 2 characters
   - Letters and spaces only

2. **Email Validation**
   - Required field
   - Valid email format using regex

3. **Phone Number**
   - Required field
   - Minimum 10 digits
   - Accepts various formats

4. **Date Validation**
   - Cannot be in the past
   - Maximum 30 days in advance
   - Required field

5. **Time Validation**
   - Must be between 11:00 AM - 10:00 PM
   - Required field

6. **Guest Count**
   - Minimum 1 guest
   - Maximum 10 guests
   - Required field

7. **Occasion**
   - Required selection from dropdown

### Error Handling

- Real-time validation feedback
- Clear, actionable error messages
- Visual error indicators
- Screen reader announcements
- Form submission prevention with invalid data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized bundle size
- Lazy loading where appropriate
- Efficient re-rendering with React hooks
- Minimal external dependencies

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact:
- Email: info@littlelemon.com
- Phone: (312) 555-0123

---

**Little Lemon Restaurant** - A family-owned Mediterranean restaurant focused on traditional recipes served with a modern twist.
