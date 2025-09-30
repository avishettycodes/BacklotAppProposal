import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GarageCardProps {
  width: number;
  imgWidth: number;
  imgHeight: number;
  year: string;
  make: string;
  model: string;
  trim: string;
  price: string;
  status: string;
  imageUri: string;
  onPress: () => void;
  onMessage: () => void;
  onRemove: () => void;
  onOverflow: () => void;
}

export default function GarageCard({
  width,
  imgWidth,
  imgHeight,
  year,
  make,
  model,
  trim,
  price,
  status,
  imageUri,
  onPress,
  onMessage,
  onRemove,
  onOverflow,
}: GarageCardProps) {
  const title = `${year} ${make} ${model} ${trim}`;
  
  return (
    <Pressable 
      style={[styles.card, { width }]}
      onPress={onPress}
      accessibilityLabel={`View details for ${title}`}
    >
      {/* Image */}
      <Image source={{ uri: imageUri }} style={[styles.image, { width: imgWidth, height: imgHeight }]} />

      {/* Card Body */}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {year} {make} {model}
        </Text>
        <Text style={styles.trim} numberOfLines={1}>{trim}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Pressable 
          style={styles.removeButton}
          onPress={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          accessibilityLabel={`Remove ${title} from Garage`}
        >
          <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
        </Pressable>
        
        <Pressable 
          style={styles.messageButton}
          onPress={(e) => {
            e.stopPropagation();
            onMessage();
          }}
          accessibilityLabel={`Message seller for ${title}`}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 120,
  },
  image: {
    resizeMode: 'cover',
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
    marginBottom: 2,
  },
  trim: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3B82F6',
  },
  actionButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  removeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  messageButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
