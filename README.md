# Caliente Frontend

> WMDD Capstone Project - AI-Powered Mobile Coaching Platform for Content Creators

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-black)](https://expo.dev/)
[![React](https://img.shields.io/badge/React-19.1-61dafb)](https://react.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb)](https://reactnative.dev/)

---

## 📱 About

**Caliente**(need to replace later) is a mobile-first AI-assisted coaching platform designed for short-form content creators. Whether you're a complete beginner or an experienced creator looking for direction, Caliente provides a private training space to practice, improve, and create better content.

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.x
npm >= 9.x
Expo Go app (for testing on physical devices)
```

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

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
API_BASE_URL=http://localhost:3000/api
API_KEY=your_api_key_here
```

4. **Start the app**

```bash
   npm start
```

5. **Run on device**
   - Press `i` for iOS
   - Press `a` for Android
   - Scan QR code for physical device

---

## 📁 Project Structure

```
src/
├── app/                # Expo Router screens
│   ├── _layout.tsx
│   └── (tabs)/
│       ├── index.tsx   # Home
│       ├── record.tsx
│       └── profile.tsx
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

## 🔧 Available Scripts

```bash
npm start              # Start dev server
npm run android        # Run on Android
npm run ios           # Run on iOS

npm run lint          # Lint code
npm run format        # Format code
npm run type-check    # Type check
```
