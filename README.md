# Piquant Catering

A luxury catering website built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   cd client && npm install
   ```

### Development

To start the development server:

```
npm run dev
```

This will start the Vite development server and open the application in your default browser.

### Building for Production

To build the application for production:

```
npm run build
```

The build artifacts will be stored in the `client/dist` directory.

### Preview Production Build

To preview the production build locally:

```
npm run preview
```

## Project Structure

- `client/` - Contains the React application
  - `src/` - Source code
    - `components/` - Reusable UI components
    - `pages/` - Page components
    - `styles/` - CSS styles
    - `assets/` - Static assets like images
- `public/` - Static files that will be served directly

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build
- `npm run clean` - Cleans node_modules and reinstalls dependencies 