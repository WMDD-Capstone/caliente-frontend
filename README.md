# Caliente Frontend

> WMDD Capstone Project - AI-Powered Mobile Coaching Platform for Content Creators

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.1-61dafb)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-18.2-61dafb)](https://react.dev/)

---

## About

**Caliente** is a mobile-first AI-assisted coaching platform designed for short-form content creators. Whether you're a complete beginner or an experienced creator looking for direction, Caliente provides a private training space to practice, improve, and create better content.

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-org/caliente-frontend.git
cd caliente-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Install iOS dependencies**

```bash
cd ios && pod install && cd ..
```

4. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
API_BASE_URL=http://localhost:3000/api
API_KEY=your_api_key_here
```

5. **Run the app**

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

---

## Project Structure

```
src/
├── screens/           # Screen components
│   ├── HomeScreen.tsx
│   ├── RecordScreen.tsx
│   └── ProfileScreen.tsx
│
├── navigation/        # React Navigation setup
│   └── AppNavigator.tsx
│
├── components/        # Reusable components
│   ├── ui/            # Buttons, inputs, cards
│   └── features/      # Camera, feedback, charts
│
├── services/          # API & external services
│   └── api/
│
├── hooks/             # Custom hooks
│   ├── queries/       # Data fetching
│   └── mutations/     # Data updates
│
├── store/             # Zustand stores
├── utils/             # Helper functions
├── constants/         # App constants
└── types/             # TypeScript types
```

---

## Available Scripts

```bash
npm start              # Start Metro bundler
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator

npm run lint           # Lint code
npm test               # Run tests
```

---

## Tech Stack

- **React Native CLI** - Mobile framework
- **React Navigation** - Navigation
- **NativeWind** - Tailwind CSS for React Native
- **Zustand** - State management
- **React Query** - Server state management
- **Vision Camera** - Camera functionality
- **TypeScript** - Type safety
