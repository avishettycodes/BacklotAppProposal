import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'secondary';
}

export default function Badge({ label, variant = 'primary' }: BadgeProps) {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'success':
        return { backgroundColor: '#10B981', color: '#FFFFFF' };
      case 'warning':
        return { backgroundColor: '#F59E0B', color: '#FFFFFF' };
      case 'secondary':
        return { backgroundColor: '#CFE9FF', color: '#0B1D4D' };
      default:
        return { backgroundColor: '#0B1D4D', color: '#FFFFFF' };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <View style={[styles.badge, { backgroundColor: badgeStyle.backgroundColor }]}>
      <Text style={[styles.badgeText, { color: badgeStyle.color }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
