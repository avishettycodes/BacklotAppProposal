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

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/avishettycodes/BacklotAppProposal.git
   cd BacklotAppProposal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # For web
   npx expo start --web
   
   # For iOS
   npx expo start --ios
   
   # For Android
   npx expo start --android
   ```

## 🔧 Development

### Project Structure
```
app/
├── components/          # Reusable UI components
├── context/            # React Context for state management
├── navigation/         # Navigation configuration
├── screens/            # Main application screens
└── App.tsx            # Root application component
```

### Key Components
- **CarCard**: Main car display component with swipe support
- **GarageCard**: Car management card for the garage
- **BottomTabs**: Navigation between main screens
- **CarContext**: Global state management for saved cars

### State Management
The app uses React Context API for managing car data:
- `savedCars`: Array of saved car objects
- `addCar()`: Function to save a car
- `removeCar()`: Function to remove a car
- `isCarSaved()`: Check if a car is already saved

## 🎯 Usage

### Swipe Gestures
- **Swipe Right**: Save car to your garage
- **Swipe Left**: Remove/reject car
- **Threshold**: 100px swipe distance required
- **Visual Feedback**: Opacity, scale, and color changes during swipes

### Navigation
- **Home Tab**: Discover and swipe through cars
- **Garage Tab**: View and manage saved cars
- **Sell Tab**: List your own car (demo interface)

## 🚧 Current Status

### ✅ Completed
- Full swipe functionality with animations
- Three main screens (Home, Garage, Sell)
- Responsive design and layouts
- TypeScript implementation
- Navigation system
- State management
- Component architecture

### 🔄 Demo Features
- Mock car data for demonstration
- Frontend-only form interface
- Placeholder image uploads
- Simulated car listings

### 🚀 Future Enhancements
- Backend integration
- Real car data API
- User authentication
- Image upload functionality
- Push notifications
- Advanced filtering and search

## 🧪 Testing

The application has been thoroughly tested for:
- ✅ Component functionality
- ✅ Navigation flow
- ✅ Swipe gestures
- ✅ State management
- ✅ Responsive design
- ✅ TypeScript compilation
- ✅ Dependency management

## 📱 Platform Support

- **iOS**: Full support with native gestures
- **Android**: Full support with native gestures
- **Web**: Full support with mouse/touch events

## 🤝 Contributing

This is a prototype application. For contributions or questions, please contact the development team.

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ using React Native and Expo**
