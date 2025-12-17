# The Harry Potter Mischief Managed App

Vite + React + TypeScript + TailwindCSS + TanStack Query + React Router.

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd hp-project
```

2. Install dependencies:

```bash
npm install
```

## Running the Project

### Development Mode

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

The development server includes:

- Hot Module Replacement (HMR) for instant updates
- React Query DevTools for debugging queries

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

This serves the built files from the `dist` directory.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## Features

- Characters: all, students, staff
- Character details
- Favorites (localStorage)
- Preferred house (localStorage + accent theme)
- Spells list with search
