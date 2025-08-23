# Workout Timer - Web Application

This is the web version of the Workout Timer application built with React, TypeScript, and Vite.

## Features

- 🎯 Interactive workout timer with visual progress indicators
- 🎵 Audio cues for work, rest, and set transitions
- 📊 Progress tracking with set and exercise counters
- 💾 Local database storage using Dexie (IndexedDB)
- 🎨 Modern UI with TailwindCSS and DaisyUI components
- 📱 Progressive Web App (PWA) capabilities
- 🌙 Screen wake lock during workouts

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **XState** - State management for timer logic
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Dexie** - IndexedDB wrapper for data persistence
- **TailwindCSS + DaisyUI** - Styling and UI components
- **Vite PWA** - Progressive Web App features

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### PWA Assets

```bash
# Generate PWA assets
npm run generate-pwa-assets
```

## Project Structure

```
src/
├── app/              # App root component and global styles
├── features/         # Feature-based components
│   ├── EditWorkout.tsx
│   ├── WorkoutsList.tsx
│   └── WorkoutTimer/   # Timer feature with state machine
├── pages/            # Route-based page components
├── shared/           # Shared utilities and components
│   ├── hooks/        # Custom React hooks
│   ├── model/        # Data models and database logic
│   └── ui/           # Reusable UI components
└── main.tsx         # Application entry point
```

## Database Schema

The application uses IndexedDB via Dexie to store workout configurations:

```typescript
type Workout = {
  id: number;
  title: string;
  workTime: string; // Format: "MM:SS"
  restTime: string; // Format: "MM:SS"
  exercises: number; // Number of exercises per set
  sets: number; // Number of sets
  breakTime: string; // Format: "MM:SS" - break between sets
};
```

## Timer States

The workout timer uses XState for predictable state management:

- **idle** - Initial state, waiting to start
- **work** - Active exercise period
- **rest** - Rest period between exercises
- **break** - Break period between sets
- **done** - Workout completed

Each state supports pause/resume functionality.

## Audio System

The app includes audio cues for:

- Second countdown (3-2 seconds remaining)
- Last second warning (1 second remaining)
- Completion sound (when timer reaches 0)

Audio is initialized on first user interaction to comply with browser policies.
