import React from 'react';
import { View, FlatList, useWindowDimensions, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AppScreen from './AppScreen';
import GarageHeader from '../components/GarageHeader';
import GarageCard from '../components/GarageCard';
import EmptyState from '../components/EmptyState';
import { useCarContext } from '../context/CarContext';

type GarageScreenNavigationProp = BottomTabNavigationProp<any, 'Garage'>;

export default function GarageScreen() {
  // Simple safe area calculation
  const bottomInset = Platform.OS === 'ios' ? 34 : 0;
  const navigation = useNavigation<GarageScreenNavigationProp>();
  const { width } = useWindowDimensions();
  const { savedCars, removeCar } = useCarContext();
  
  // Responsive grid calculations
  const GUTTER = 16;
  const numCols = width < 420 ? 1 : 2;
  const MAX = 540;
  const CARD_W = Math.min(MAX, Math.floor((width - GUTTER * (numCols + 1)) / numCols));
  const IMG_H = Math.round(CARD_W * 9/16);
  
  // Transform saved cars to match GarageCard interface
  const garageCars = savedCars.map(car => ({
    ...car,
    status: 'Saved' as const,
  }));

  const handleMessage = (carTitle: string) => {
    Alert.alert('Message', `Message functionality for ${carTitle} would be implemented here.`);
  };

  const handleRemove = (carId: string) => {
    Alert.alert(
      'Remove Car',
      'Are you sure you want to remove this car from your Garage?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => removeCar(carId)
        },
      ]
    );
  };

  const handleOverflow = (carTitle: string) => {
    Alert.alert('More Options', `Additional options for ${carTitle} would appear here.`);
  };

  const handleGoToHome = () => {
    // Navigate to Home tab
    navigation.navigate('Home' as never);
  };

  const renderCarCard = ({ item }: { item: typeof garageCars[0] }) => (
    <GarageCard
      width={CARD_W}
      imgHeight={IMG_H}
      title={item.title}
      price={item.price}
      status={item.status}
      details={item.details}
      imageUri={item.imageUri}
      onMessage={() => handleMessage(item.title)}
      onRemove={() => handleRemove(item.id)}
      onOverflow={() => handleOverflow(item.title)}
    />
  );

  const renderSeparator = () => <View style={{ height: 16 }} />;

  if (garageCars.length === 0) {
    return (
      <AppScreen>
        <EmptyState onGoToHome={handleGoToHome} />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <FlatList
        data={garageCars}
        renderItem={renderCarCard}
        keyExtractor={(item) => item.id}
        numColumns={numCols}
        columnWrapperStyle={numCols > 1 ? { gap: 16 } : undefined}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={<GarageHeader count={garageCars.length} />}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 24 + bottomInset,
        }}
        showsVerticalScrollIndicator={false}
      />
    </AppScreen>
  );
}
