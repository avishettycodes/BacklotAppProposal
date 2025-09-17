import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import GarageScreen from '../screens/GarageScreen';
import SellScreen from '../screens/SellScreen';

const Tab = createBottomTabNavigator();

const colors = { 
  primary: '#3B82F6', 
  muted: '#64748B',
  background: '#FFFFFF',
  border: '#E2E8F0'
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
          height: 60 + bottomInset,
          paddingBottom: Math.max(bottomInset, 12),
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.background,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: { 
          fontSize: 12, 
          fontWeight: '600',
          marginTop: 2,
        },
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
