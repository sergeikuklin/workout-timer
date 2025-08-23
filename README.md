# Workout Interval Timer - Monorepo

This is a workout interval timer application with support for both web and mobile platforms.

## Project Structure

```
workout-interval/
├── packages/
│   ├── shared/          # Shared business logic, models, and utilities
│   ├── web/            # Web application (React + Vite)
│   └── mobile/         # React Native mobile app (coming soon)
├── package.json        # Root package.json for monorepo management
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies for all packages:
   ```bash
   npm install
   ```

### Development

#### Web Application

```bash
# Start web development server
npm run dev:web

# Build web application
npm run build:web

# Preview web build
npm run preview
```

#### Mobile Application

```bash
# Start mobile development (coming soon)
npm run dev:mobile

# Build mobile application (coming soon)
npm run build:mobile
```

### Shared Package

The `shared` package contains reusable business logic:

- Timer state machine using XState
- Workout data types and models
- Utility functions for time conversion

To build the shared package:

```bash
cd packages/shared
npm run build
```

## Features

- ⏱️ Customizable workout intervals
- 🔄 Support for multiple sets and exercises
- 🔊 Audio cues for timing
- 💾 Local data storage
- 📱 Progressive Web App (PWA) support
- 🌙 Keep screen awake during workouts

## Architecture

This monorepo uses npm workspaces to manage multiple packages:

- **shared**: Contains platform-agnostic business logic and utilities
- **web**: React-based web application using Vite, TailwindCSS, and DaisyUI
- **mobile**: React Native mobile application (in development)

## Contributing

1. Make changes to the appropriate package
2. Build the shared package if you modify it: `cd packages/shared && npm run build`
3. Test your changes in the relevant platform
4. Submit a pull request
