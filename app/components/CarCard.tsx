import React from 'react';
import { useWindowDimensions, View, Image, Text, StyleSheet, Pressable } from 'react-native';

interface CarCardProps {
  imageUri: string;
  title: string;
  price: string;
  details: string;
  onPress?: () => void;
}

export default function CarCard({ imageUri, title, price, details, onPress }: CarCardProps) {
  const { width, height } = useWindowDimensions();
  const H_PADDING = 20;
  const TOP_BAR_HEIGHT = 80; // Top bar height (logo + padding + separator)
  const BOTTOM_NAV_HEIGHT = 80; // Bottom navigation height
  const EXTRA_SPACING = 60; // Extra spacing above and below the card
  const CARD_WIDTH = Math.min(600, width - H_PADDING * 2); // cap on tablets
  const CARD_HEIGHT = height - TOP_BAR_HEIGHT - BOTTOM_NAV_HEIGHT - EXTRA_SPACING; // Smaller card with spacing

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { width: CARD_WIDTH, height: CARD_HEIGHT },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Car card for ${title}`}
    >
      <Image 
        source={{ uri: imageUri }} 
        style={[styles.image, { height: CARD_HEIGHT * 0.65 }]} 
      />
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.meta}>{details}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  body: { 
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: { 
    fontSize: 24, 
    fontWeight: '600', 
    color: '#0F172A',
    marginBottom: 12,
    lineHeight: 30,
    textAlign: 'center',
  },
  price: { 
    marginTop: 12, 
    fontSize: 32, 
    fontWeight: '700', 
    color: '#0B1D4D',
    marginBottom: 8,
    textAlign: 'center',
  },
  meta: { 
    marginTop: 8, 
    color: '#64748B',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
