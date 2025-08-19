import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GarageCardProps {
  width: number;
  imgHeight: number;
  title: string;
  price: string;
  status: string;
  details: string;
  imageUri: string;
  onMessage: () => void;
  onRemove: () => void;
  onOverflow: () => void;
}

export default function GarageCard({
  width,
  imgHeight,
  title,
  price,
  status,
  details,
  imageUri,
  onMessage,
  onRemove,
  onOverflow,
}: GarageCardProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 'Saved':
        return { backgroundColor: '#CFE9FF', color: '#0B1D4D' };
      case 'For Sale':
        return { backgroundColor: '#CFE9FF', color: '#0B1D4D' };
      case 'Sold':
        return { backgroundColor: '#16A34A', color: '#FFFFFF' };
      case 'Pending':
        return { backgroundColor: '#F59E0B', color: '#FFFFFF' };
      default:
        return { backgroundColor: '#CFE9FF', color: '#0B1D4D' };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <View style={[styles.card, { width, height: imgHeight + 200 }]}>
      {/* Image with Status Pill */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={[styles.image, { height: imgHeight }]} />
        <View style={[styles.statusPill, { backgroundColor: statusStyle.backgroundColor }]}>
          <Text style={[styles.statusText, { color: statusStyle.color }]}>{status}</Text>
        </View>
        
        {/* Overflow Menu */}
        <Pressable 
          style={styles.overflowButton}
          onPress={onOverflow}
          accessibilityLabel={`More options for ${title}`}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#64748B" />
        </Pressable>
      </View>

      {/* Card Body */}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.meta}>{details}</Text>
        
        {/* Actions Row */}
        <View style={styles.actionsRow}>
          <Pressable 
            style={styles.primaryBtn}
            onPress={onMessage}
            accessibilityLabel={`Message seller for ${title}`}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={16} color="#FFFFFF" />
            <Text style={styles.primaryBtnText}>Message</Text>
          </Pressable>
          
          <Pressable 
            style={styles.dangerBtn}
            onPress={onRemove}
            accessibilityLabel={`Remove ${title} from Garage`}
          >
            <Ionicons name="trash-outline" size={16} color="#B91C1C" />
            <Text style={styles.dangerBtnText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#0B1D4D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  statusPill: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  overflowButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
    lineHeight: 22,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B1D4D',
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0B1D4D',
    paddingVertical: 12,
    borderRadius: 14,
    minHeight: 44,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  dangerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    paddingVertical: 12,
    borderRadius: 14,
    minHeight: 44,
  },
  dangerBtnText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '500',
  },
});
