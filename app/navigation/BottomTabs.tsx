import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import GarageScreen from '../screens/GarageScreen';
import SellScreen from '../screens/SellScreen';

const Tab = createBottomTabNavigator();

const colors = { 
  primary: '#0B1D4D', 
  muted: '#64748B' 
};

export default function BottomTabs() {
  // Simple safe area calculation for bottom tabs
  const bottomInset = Platform.OS === 'ios' ? 34 : 0;
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 56 + bottomInset,
          paddingBottom: Math.max(bottomInset, 8),
          paddingTop: 6,
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Garage" 
        component={GarageScreen}
        options={{
          tabBarLabel: 'Garage',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'car-sport' : 'car-sport-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Sell" 
        component={SellScreen}
        options={{
          tabBarLabel: 'Sell',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? 'add-circle' : 'add-circle-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
