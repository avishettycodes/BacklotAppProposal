import React, { useState } from 'react';
import { View, FlatList, useWindowDimensions, Alert, Platform, Modal, ScrollView, Image, Text, Pressable, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AppScreen from './AppScreen';
import GarageHeader from '../components/GarageHeader';
import GarageCard from '../components/GarageCard';
import EmptyState from '../components/EmptyState';
import { useCarContext } from '../context/CarContext';

type GarageScreenNavigationProp = BottomTabNavigationProp<any, 'Garage'>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Helper function to calculate time since listing
const getTimeSinceListing = (listedDate: string): string => {
  const listed = new Date(listedDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - listed.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `Over ${years} year${years > 1 ? 's' : ''} ago`;
  }
};

// Helper function to get deal tier color
const getDealTierColor = (dealTier: string): string => {
  switch (dealTier) {
    case 'Great Deal':
      return '#059669';
    case 'Good Deal':
      return '#0EA5E9';
    case 'Fair Deal':
      return '#F59E0B';
    case 'Poor Deal':
      return '#DC2626';
    default:
      return '#64748B';
  }
};

export default function GarageScreen() {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom || 0;
  const navigation = useNavigation<GarageScreenNavigationProp>();
  const { width } = useWindowDimensions();
  const { savedCars, removeCar } = useCarContext();
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isFullScreenImage, setIsFullScreenImage] = useState(false);
  const [fullScreenImages, setFullScreenImages] = useState<string[]>([]);
  const [fullScreenStartIndex, setFullScreenStartIndex] = useState(0);
  
  // Card dimensions for horizontal layout
  const CARD_W = width - 32; // Full width with padding
  const IMG_W = 120; // Square-ish image width
  const IMG_H = 120; // Square-ish image height
  
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

  const handleCardPress = (car: any) => {
    setSelectedCar(car);
    setCarouselIndex(0);
  };

  const handleCarouselScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const imageIndex = Math.round(contentOffsetX / screenWidth);
    setCarouselIndex(imageIndex);
  };

  const openFullScreenImage = (images: string[], startIndex: number) => {
    setFullScreenImages(images);
    setFullScreenStartIndex(startIndex);
    setIsFullScreenImage(true);
  };

  const renderCarCard = ({ item }: { item: typeof garageCars[0] }) => (
    <GarageCard
      width={CARD_W}
      imgWidth={IMG_W}
      imgHeight={IMG_H}
      year={item.year}
      make={item.make}
      model={item.model}
      trim={item.trim}
      price={item.price}
      status={item.status}
      imageUri={item.imageUri}
      onPress={() => handleCardPress(item)}
      onMessage={() => handleMessage(`${item.year} ${item.make} ${item.model}`)}
      onRemove={() => handleRemove(item.id)}
      onOverflow={() => handleOverflow(`${item.year} ${item.make} ${item.model}`)}
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
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={<GarageHeader count={garageCars.length} />}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 24 + bottomInset,
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* Car Details Modal */}
      {selectedCar && (
        <Modal
          visible={!!selectedCar}
          animationType="slide"
          onRequestClose={() => setSelectedCar(null)}
          presentationStyle="fullScreen"
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalHeader, { top: insets.top }]}>
              <View style={styles.imageCounter}>
                <Text style={styles.imageCounterText}>
                  {carouselIndex + 1} / {selectedCar.images?.length || 1}
                </Text>
              </View>
              <Pressable 
                style={styles.closeButton}
                onPress={() => setSelectedCar(null)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.modalScrollContent, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 20) + 40 }]}
            >
              {/* Image Carousel */}
              <View style={styles.imageCarousel}>
                <ScrollView 
                  horizontal 
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={handleCarouselScroll}
                  nestedScrollEnabled={true}
                  scrollEnabled={true}
                >
                  {selectedCar.images?.map((imageUri: string, imgIndex: number) => (
                    <TouchableOpacity 
                      key={imgIndex}
                      activeOpacity={0.9}
                      onPress={() => {
                        console.log('Image pressed:', imgIndex);
                        openFullScreenImage(selectedCar.images || [], imgIndex);
                      }}
                    >
                      <Image 
                        source={{ uri: imageUri }} 
                        style={styles.carouselImage} 
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Compact Header with Price and Deal Badge */}
              <View style={styles.backHeaderCompact}>
                <View style={styles.backHeaderTop}>
                  <View style={styles.backHeaderLeft}>
                    <Text style={styles.backPrice}>{selectedCar.price}</Text>
                    {selectedCar.dealTier && (
                      <View style={[styles.dealTierBadgeCompact, { backgroundColor: getDealTierColor(selectedCar.dealTier) }]}>
                        <Text style={styles.dealTierTextCompact}>{selectedCar.dealTier}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text style={styles.backVehicleTitleCompact}>{selectedCar.year} {selectedCar.make} {selectedCar.model} {selectedCar.trim}</Text>
                <View style={styles.quickInfoRow}>
                  <Text style={styles.quickInfoText}>{selectedCar.miles} mi</Text>
                  <Text style={styles.quickInfoDivider}>•</Text>
                  <Text style={styles.quickInfoText}>{selectedCar.city}, {selectedCar.state}</Text>
                  {selectedCar.listedDate && (
                    <>
                      <Text style={styles.quickInfoDivider}>•</Text>
                      <Text style={styles.quickInfoText}>{getTimeSinceListing(selectedCar.listedDate)}</Text>
                    </>
                  )}
                </View>
              </View>

              {/* Key Details Grid - Most Important Info */}
              <View style={styles.keyDetailsSection}>
                <View style={styles.keyDetailItem}>
                  <Text style={styles.keyDetailLabel}>Mileage</Text>
                  <Text style={styles.keyDetailValue}>{selectedCar.miles} mi</Text>
                </View>
                <View style={styles.keyDetailItem}>
                  <Text style={styles.keyDetailLabel}>Title</Text>
                  <Text style={styles.keyDetailValue}>{selectedCar.titleStatus}</Text>
                </View>
                {selectedCar.transmission && (
                  <View style={styles.keyDetailItem}>
                    <Text style={styles.keyDetailLabel}>Transmission</Text>
                    <Text style={styles.keyDetailValue}>{selectedCar.transmission}</Text>
                  </View>
                )}
                {selectedCar.fuelType && (
                  <View style={styles.keyDetailItem}>
                    <Text style={styles.keyDetailLabel}>Fuel Type</Text>
                    <Text style={styles.keyDetailValue}>{selectedCar.fuelType}</Text>
                  </View>
                )}
                {selectedCar.exteriorColor && (
                  <View style={styles.keyDetailItem}>
                    <Text style={styles.keyDetailLabel}>Exterior</Text>
                    <Text style={styles.keyDetailValue}>{selectedCar.exteriorColor}</Text>
                  </View>
                )}
                {selectedCar.interiorColor && (
                  <View style={styles.keyDetailItem}>
                    <Text style={styles.keyDetailLabel}>Interior</Text>
                    <Text style={styles.keyDetailValue}>{selectedCar.interiorColor}</Text>
                  </View>
                )}
              </View>

              {/* Pros and Cons Side by Side */}
              {(selectedCar.pros || selectedCar.cons) && (
                <View style={styles.prosConsCompact}>
                  {selectedCar.pros && (
                    <View style={styles.prosColumnCompact}>
                      <Text style={styles.prosConsTitleCompact}>Pros</Text>
                      {selectedCar.pros.slice(0, 3).map((pro: string, idx: number) => (
                        <Text key={idx} style={styles.prosTextCompact}>• {pro}</Text>
                      ))}
                    </View>
                  )}
                  {selectedCar.cons && (
                    <View style={styles.consColumnCompact}>
                      <Text style={styles.prosConsTitleCompact}>Cons</Text>
                      {selectedCar.cons.slice(0, 3).map((con: string, idx: number) => (
                        <Text key={idx} style={styles.consTextCompact}>• {con}</Text>
                      ))}
                    </View>
                  )}
                </View>
              )}

              {/* Description - Condensed */}
              {selectedCar.description && (
                <View style={styles.descriptionCompact}>
                  <Text style={styles.descriptionTextCompact}>{selectedCar.description}</Text>
                </View>
              )}

              {/* Seller Info - Compact */}
              <View style={styles.sellerCompact}>
                <Text style={styles.sellerLabel}>Seller</Text>
                <Text style={styles.sellerNameCompact}>{selectedCar.seller}</Text>
              </View>
            </ScrollView>

            {/* Full Screen Image Modal - Inside Detail Modal */}
            {isFullScreenImage && (
              <Modal
                visible={isFullScreenImage}
                transparent={false}
                animationType="fade"
                onRequestClose={() => setIsFullScreenImage(false)}
              >
                <View style={styles.fullScreenContainer}>
                  <Pressable 
                    style={styles.fullScreenCloseButton}
                    onPress={() => setIsFullScreenImage(false)}
                  >
                    <Text style={styles.fullScreenCloseButtonText}>✕</Text>
                  </Pressable>
                  
                  <ScrollView 
                    horizontal 
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    contentOffset={{ x: fullScreenStartIndex * screenWidth, y: 0 }}
                  >
                    {fullScreenImages.map((imageUri, imgIndex) => (
                      <View key={imgIndex} style={styles.fullScreenImageWrapper}>
                        <ScrollView
                          maximumZoomScale={3}
                          minimumZoomScale={1}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                        >
                          <Image 
                            source={{ uri: imageUri }} 
                            style={styles.fullScreenImage}
                            resizeMode="contain"
                          />
                        </ScrollView>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </Modal>
            )}
          </View>
        </Modal>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  modalScrollContent: {
    paddingTop: 0,
  },
  imageCarousel: {
    height: 300,
  },
  carouselImage: {
    width: screenWidth,
    height: 300,
    resizeMode: 'cover',
  },
  imageCounter: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageCounterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  backHeaderCompact: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  backHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backPrice: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0B1D4D',
  },
  dealTierBadgeCompact: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dealTierTextCompact: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backVehicleTitleCompact: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  quickInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  quickInfoText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  quickInfoDivider: {
    fontSize: 13,
    color: '#CBD5E1',
    marginHorizontal: 8,
  },
  keyDetailsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: '#F8FAFC',
    gap: 8,
  },
  keyDetailItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  keyDetailLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  keyDetailValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '700',
  },
  prosConsCompact: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  prosColumnCompact: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#059669',
  },
  consColumnCompact: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
  },
  prosConsTitleCompact: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  prosTextCompact: {
    fontSize: 12,
    color: '#059669',
    lineHeight: 18,
    marginBottom: 4,
  },
  consTextCompact: {
    fontSize: 12,
    color: '#DC2626',
    lineHeight: 18,
    marginBottom: 4,
  },
  descriptionCompact: {
    padding: 16,
    backgroundColor: '#F8FAFC',
  },
  descriptionTextCompact: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  sellerCompact: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sellerLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  sellerNameCompact: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  fullScreenImageWrapper: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: screenWidth,
    height: screenHeight,
  },
});
