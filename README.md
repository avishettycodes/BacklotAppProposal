# Backlot Prototype

A sleek, modern, Tinder-styled car marketplace mobile app built with Expo + React Native + TypeScript.

## Features

- **Frontend Only**: Pure UI mockup with no backend, APIs, or data persistence
- **3-Tab Navigation**: Home, Garage, and Sell screens
- **Modern Design**: Clean, card-based UI with proper spacing and typography
- **Accessibility**: Proper labels and roles for interactive elements
- **Responsive**: Optimized for both iOS and Android

## Screens

### 🏠 Home
- Tinder-style car card stack (static, no swipe logic)
- "Find your next ride" header
- Action buttons: Skip, Save, Details (non-functional)
- Layered card design with rotation effects

### 🚗 Garage
- 2-column grid of "My Cars"
- Status badges (For Sale, Sold, Pending)
- Edit and Remove buttons (non-functional)
- Car thumbnails with pricing

### 📝 Sell
- Non-functional form UI
- Image picker placeholder
- Text inputs for car details
- Condition segmented control (New/Used)
- Disabled "List Car" button with helper text

## Tech Stack

- **Expo SDK 50** (latest stable)
- **React Native 0.73.6**
- **TypeScript 5.1.3**
- **React Navigation v6** with bottom tabs
- **Expo Google Fonts**: Poppins (600/700) + Inter (400/500)
- **Expo Vector Icons**: Ionicons

## Design System

- **Primary**: Navy Blue (#0B1D4D)
- **Secondary**: Baby Blue (#CFE9FF)
- **Background**: Light Blue (#F8FAFF)
- **Text**: Dark (#0F172A)
- **Muted**: Gray (#64748B)
- **Typography**: Poppins for headings, Inter for body text
- **Spacing**: Consistent 4px grid system
- **Shadows**: Subtle, modern card shadows

## Project Structure

```
BacklotPrototype/
├── app/
│   ├── App.tsx                 # Main app entry with font loading
│   ├── navigation/
│   │   └── BottomTabs.tsx     # Bottom tab navigation
│   ├── screens/
│   │   ├── HomeScreen.tsx      # Home screen with car stack
│   │   ├── GarageScreen.tsx    # Garage grid layout
│   │   └── SellScreen.tsx      # Sell form UI
│   ├── components/
│   │   ├── CarCard.tsx         # Reusable car card component
│   │   └── Badge.tsx           # Status badge component
│   └── theme/
│       ├── colors.ts           # Color palette
│       ├── typography.ts       # Font configurations
│       └── spacing.ts          # Spacing constants
├── assets/                     # App icons and splash screens
├── package.json                # Dependencies
├── tsconfig.json              # TypeScript config
├── babel.config.js            # Babel config
├── app.json                   # Expo config
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npx expo start
   ```

3. **Run on device:**
   - Scan the QR code with Expo Go (iOS/Android)
   - Or press `i` for iOS simulator, `a` for Android emulator

### Testing

- **iOS**: Tested on Expo Go for iOS
- **Android**: Tested on Expo Go for Android
- **Web**: Not optimized (mobile-only app)

## Development Notes

- **No Backend**: All data is static/mock
- **No State Management**: Only local component state for UI interactions
- **No Persistence**: No data storage or form submission
- **Navigation Only**: Tab switching is the only functional logic
- **Accessibility**: Proper labels, roles, and hints for screen readers

## Customization

The app uses a centralized theme system:
- Modify `theme/colors.ts` for color changes
- Update `theme/typography.ts` for font adjustments
- Adjust `theme/spacing.ts` for layout spacing

## Troubleshooting

- **Fonts not loading**: Ensure all font dependencies are installed
- **Navigation issues**: Check React Navigation version compatibility
- **Build errors**: Clear Metro cache with `npx expo start --clear`

## License

This is a prototype/demo project. No production use intended.
