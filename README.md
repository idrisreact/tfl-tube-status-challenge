# TFL Tube Line Status Challenge

A responsive React application displaying real-time London Underground tube line statuses using the TfL Open Data API.

## Features

- Real-time tube line status updates
- Responsive design (2 columns desktop, 1 column mobile)
- WCAG 2.1 AA compliant accessibility
- Auto-refresh every 60 seconds
- Loading states and error handling
- Color-coded status indicators for different tube lines

## Technology Stack

- **React 18** with TypeScript
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** for responsive styling
- **Vite** for build tooling
- **Vitest** and **React Testing Library** for testing

## Prerequisites

- Node.js 16+ and npm
- Modern web browser with ES2020 support

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/idrisreact/tfl-tube-status-challenge
cd tfl_coding_challenge

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── card/           # Tube line status card
│   ├── loading-skeleton/  # Loading state component
│   └── tfl-lines-status-grid/  # Main grid component
├── hooks/              # Custom React hooks
├── services/           # API service functions
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── test/              # Test setup and utilities
```

## API Configuration

This application uses the TfL Open Data API, which doesn't require authentication for basic tube line status data.

**API Endpoint:** `https://api.tfl.gov.uk/Line/Mode/Tube/Status`

If you need to configure different API settings or add authentication, you can modify the `fetchTubeLineStatus` function in `src/services/fetchTubeLineStatus.ts`.

## Accessibility Features

This application is built to meet WCAG 2.1 AA standards:

- Semantic HTML structure with proper headings
- ARIA labels and live regions for screen readers
- Keyboard navigation support
- High contrast colors
- Responsive text sizing

## Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## Assumptions Made

1. **API Availability**: The TfL API is publicly available and doesn't require authentication for basic line status data
2. **Real-time Updates**: Status updates every 60 seconds is sufficient for user needs
3. **Device Support**: Optimized for desktop, tablet, and mobile viewports (minimum 320px width)
4. **Data Structure**: TfL API response structure remains consistent with the provided specification
5. **Browser Support**: Users have modern browsers with ES2020 support

## Testing Strategy

The application includes 25 tests covering:

- **Component Rendering** (9 tests): Core functionality and props handling
- **API Integration** (8 tests): Loading states, success/error scenarios, data handling
- **Accessibility** (6 tests): ARIA attributes, semantic HTML, screen reader support
- **Utility Functions** (2 tests): Color mapping and edge cases

## Performance Considerations

- **React Query Caching**: Reduces API calls and improves performance
- **Lazy Loading**: Components are loaded on demand
- **Optimized Bundle**: Tree-shaking and code splitting with Vite
- **Responsive Images**: Efficient loading across different screen sizes

## Development Notes

- Built using Test-Driven Development (TDD) practices
- Follows React best practices and hooks patterns
- TypeScript for type safety and better developer experience
- Tailwind CSS for consistent and maintainable styling

## License

This project is created for the TfL coding challenge.
