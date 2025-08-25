# Backlot App - Car Discovery & Management Platform

A modern React Native mobile application built with Expo for discovering, saving, and managing cars. Features intuitive swipe gestures, a personal garage, and a clean, professional UI.

## 🚀 Features

### Core Functionality
- **Swipe Interface**: Intuitive left/right swipe gestures to save or remove cars
- **Car Discovery**: Browse through curated car listings with detailed information
- **Personal Garage**: Save and manage your favorite cars
- **Modern UI**: Clean, responsive design with smooth animations

### Technical Features
- **React Native + Expo**: Cross-platform mobile development
- **TypeScript**: Full type safety and better development experience
- **Navigation**: Bottom tab navigation with React Navigation
- **State Management**: Context API for car data management
- **Gesture Handling**: React Native Gesture Handler for swipe interactions
- **Responsive Design**: Adapts to different screen sizes and orientations

## 📱 Screens

### Home Screen
- Car discovery interface with swipe functionality
- Visual feedback during swipes (opacity, scale effects)
- Swipe direction indicators (SAVE/REMOVE)
- Action feedback overlays
- Mock car data for demonstration

### Garage Screen
- Grid layout for saved cars
- Responsive design (1-2 columns based on screen width)
- Car status management
- Search and filter capabilities (UI ready)
- Empty state with call-to-action

### Sell Screen
- Car listing form interface
- Image upload placeholder
- Form fields for car details
- Condition selector (New/Used)
- Demo form (frontend only)

## 🛠️ Tech Stack

- **Frontend**: React Native 0.79.5, React 19.0.0
- **Framework**: Expo SDK 53
- **Navigation**: React Navigation 6
- **Gestures**: React Native Gesture Handler
- **Styling**: React Native StyleSheet
- **Language**: TypeScript 5.9.2
- **Icons**: Expo Vector Icons (Ionicons)

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### For Mobile Development (Optional but Recommended)
- **Expo Go** app on your mobile device
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)

## 📦 Installation & Setup

### Step 1: Clone the Repository
```bash
# Clone the repository
git clone https://github.com/avishettycodes/BacklotAppProposal.git

# Navigate to the project directory
cd BacklotAppProposal
```

### Step 2: Install Dependencies
```bash
# Install all required packages
npm install

# Or if you prefer yarn
yarn install
```

### Step 3: Start the Development Server
```bash
# Start Expo development server
npm start

# Or use the expo command directly
npx expo start
```

## 🎯 Running the Application

### Option 1: Web Browser (Easiest)
```bash
# Start the web version
npm run web
# or
npx expo start --web
```
This will open the app in your default web browser. Perfect for development and testing.

### Option 2: Mobile Device (Recommended)
1. **Install Expo Go** on your mobile device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start the development server**:
   ```bash
   npm start
   # or
   npx expo start
   ```

3. **Scan the QR code** that appears in your terminal with:
   - **iOS**: Camera app or Expo Go app
   - **Android**: Expo Go app

4. The app will load on your device and automatically reload when you make changes.

### Option 3: iOS Simulator (macOS only)
```bash
# Start iOS simulator
npm run ios
# or
npx expo start --ios
```

### Option 4: Android Emulator
```bash
# Start Android emulator
npm run android
# or
npx expo start --android
```

## 🔧 Development Commands

### Available Scripts
```bash
# Start development server
npm start

# Start web version
npm run web

# Start iOS simulator
npm run ios

# Start Android emulator
npm run android

# Build for production
npx expo build
```

### Development Workflow
1. **Start the server**: `npm start`
2. **Make code changes** in your editor
3. **Save the file** - changes will automatically reload
4. **Test on device/simulator** - see changes in real-time

## 🐛 Troubleshooting

### Common Issues & Solutions

#### "Metro bundler not found"
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### "Expo CLI not found"
```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Or use npx (recommended)
npx expo start
```

#### "Port already in use"
```bash
# Kill process on port 8081 (default Expo port)
lsof -ti:8081 | xargs kill -9

# Or start on a different port
npx expo start --port 8082
```

#### "Metro bundler error"
```bash
# Clear Metro cache
npx expo start --clear

# Or reset completely
npx expo start --clear --reset-cache
```

### Platform-Specific Issues

#### iOS Issues
- Ensure Xcode is properly installed and configured
- Check that iOS Simulator is working
- Verify iOS development certificates

#### Android Issues
- Ensure Android Studio and SDK are installed
- Check that ANDROID_HOME environment variable is set
- Verify Android emulator is running

## 📱 Testing Your Changes

### Real-time Development
- **Hot Reload**: Changes appear instantly on your device
- **Live Reload**: App restarts when you save files
- **Error Overlay**: See errors directly on your device

### Testing Checklist
- [ ] Test swipe gestures on Home screen
- [ ] Verify car saving/removal functionality
- [ ] Check navigation between tabs
- [ ] Test responsive design on different screen sizes
- [ ] Verify TypeScript compilation

## 🔄 Project Structure

```
BacklotPrototype/
├── app/                    # Main application code
│   ├── components/         # Reusable UI components
│   ├── context/           # React Context for state management
│   ├── navigation/        # Navigation configuration
│   ├── screens/           # Main application screens
│   └── App.tsx           # Root application component
├── assets/                # Images, fonts, and static files
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── babel.config.js        # Babel configuration
└── app.json              # Expo configuration
```

### Key Files
- **`app/App.tsx`**: Main application entry point
- **`app/screens/`**: Individual screen components
- **`app/components/`**: Reusable UI components
- **`app/context/CarContext.tsx`**: Global state management
- **`package.json`**: Project dependencies and scripts

## 🚀 Deployment

### Building for Production
```bash
# Build for web
npx expo build:web

# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android
```

### Publishing Updates
```bash
# Publish to Expo
npx expo publish
```

## 🤝 Contributing

### Development Guidelines
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following the existing code style
4. **Test thoroughly** on multiple platforms
5. **Commit your changes**: `git commit -m "Add your feature description"`
6. **Push to your branch**: `git push origin feature/your-feature-name`
7. **Create a Pull Request**

### Code Style
- Use TypeScript for all new files
- Follow existing component patterns
- Maintain responsive design principles
- Add proper error handling
- Include TypeScript types for all functions

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Navigation Documentation](https://reactnavigation.org/)

## 🆘 Getting Help

If you encounter issues:

1. **Check the troubleshooting section** above
2. **Search existing issues** in the repository
3. **Create a new issue** with:
   - Clear description of the problem
   - Steps to reproduce
   - Your environment details (OS, Node version, etc.)
   - Error messages or screenshots

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ using React Native and Expo**

**Happy coding! 🚗💨**
