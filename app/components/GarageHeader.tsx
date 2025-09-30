import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GarageHeaderProps {
  count: number;
}

export default function GarageHeader({ count }: GarageHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>My Garage</Text>
      <Text style={styles.subtitle}>{count} {count === 1 ? 'car' : 'cars'} saved</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
  },
});
