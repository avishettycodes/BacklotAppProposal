import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  onGoToHome: () => void;
}

export default function EmptyState({ onGoToHome }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="car-outline" size={64} color="#CFE9FF" />
      </View>
      
      <Text style={styles.title}>No cars in your Garage</Text>
      <Text style={styles.subtitle}>
        Cars you save on Home will appear here.
      </Text>
      
      <Pressable 
        style={styles.button}
        onPress={onGoToHome}
        accessibilityLabel="Go to Home screen"
      >
        <Ionicons name="home-outline" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Go to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8FAFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0B1D4D',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 14,
    minHeight: 48,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
