import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GarageHeaderProps {
  count: number;
}

export default function GarageHeader({ count }: GarageHeaderProps) {
  const filterChips = ['All', 'Saved', 'For Sale', 'Sold'];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>My Garage ({count})</Text>
      
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search cars..."
          placeholderTextColor="#64748B"
          editable={false}
        />
      </View>
      
      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        {filterChips.map((filter, index) => (
          <Pressable
            key={filter}
            style={[
              styles.filterChip,
              index === 0 && styles.filterChipActive
            ]}
            disabled={true}
          >
            <Text style={[
              styles.filterChipText,
              index === 0 && styles.filterChipTextActive
            ]}>
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>
      
      {/* Separator */}
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#0B1D4D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterChipActive: {
    backgroundColor: '#0B1D4D',
    borderColor: '#0B1D4D',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
});
