import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabs from './navigation/BottomTabs';
import { CarProvider } from './context/CarContext';

// Colors
const colors = {
  background: '#F8FAFF',
  muted: '#64748B',
};

export default function App() {
  // Temporarily removed font loading to test SafeAreaView fix
  
  return (
    <SafeAreaProvider>
      <CarProvider>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor={colors.background} />
          <BottomTabs />
        </NavigationContainer>
      </CarProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    color: colors.muted,
    fontSize: 16,
    fontWeight: '400',
  },
});
