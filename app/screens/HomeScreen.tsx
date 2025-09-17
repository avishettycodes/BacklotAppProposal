import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, Image, Animated, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import AppScreen from './AppScreen';

// Sample car data
const sampleCars = [
  {
    id: '1',
    title: 'Tesla Model 3',
    price: '$34,990',
    year: '2020',
    mileage: '12,400 mi',
    location: 'San Jose, CA',
    imageUri: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'AutoMax Dealers'
  },
  {
    id: '2',
    title: 'BMW 3 Series',
    price: '$28,500',
    year: '2019',
    mileage: '18,200 mi',
    location: 'San Francisco, CA',
    imageUri: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'Bay Area Motors'
  },
  {
    id: '3',
    title: 'Audi A4',
    price: '$32,000',
    year: '2021',
    mileage: '8,900 mi',
    location: 'Oakland, CA',
    imageUri: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'Premium Auto'
  },
  {
    id: '4',
    title: 'Mercedes C-Class',
    price: '$38,500',
    year: '2020',
    mileage: '15,600 mi',
    location: 'Palo Alto, CA',
    imageUri: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'Luxury Cars Inc'
  },
  {
    id: '5',
    title: 'Honda Civic',
    price: '$22,000',
    year: '2022',
    mileage: '5,200 mi',
    location: 'Fremont, CA',
    imageUri: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'Reliable Motors'
  },
  {
    id: '6',
    title: 'Toyota Camry',
    price: '$25,500',
    year: '2021',
    mileage: '11,800 mi',
    location: 'San Mateo, CA',
    imageUri: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'Toyota Direct'
  }
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.25;

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const nextCardOpacity = useRef(new Animated.Value(0)).current;
  const nextCardScale = useRef(new Animated.Value(0.8)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === 5) { // END state
      const { translationX, velocityX } = event.nativeEvent;
      
      if (Math.abs(translationX) > SWIPE_THRESHOLD || Math.abs(velocityX) > 500) {
        // Swipe left or right
        const direction = translationX > 0 ? 1 : -1;
        const toValue = direction * screenWidth;
        
        Animated.parallel([
          Animated.timing(translateX, {
            toValue,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: direction * 100,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(rotate, {
            toValue: direction * 0.2,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Move to next card
          setCurrentIndex(prev => prev + 1);
          translateX.setValue(0);
          translateY.setValue(0);
          rotate.setValue(0);
          
          // Animate next card in
          Animated.parallel([
            Animated.timing(nextCardOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(nextCardScale, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start();
        });
      } else {
        // Return to center
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(rotate, {
            toValue: 0,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  };

  const renderCard = (item: typeof sampleCars[0], index: number) => {
    const isCurrentCard = index === currentIndex;
    const isNextCard = index === currentIndex + 1;
    
    if (index < currentIndex) return null;
    
    const cardStyle = {
      transform: [
        { translateX: isCurrentCard ? translateX : 0 },
        { translateY: isCurrentCard ? translateY : 0 },
        { 
          rotate: isCurrentCard ? rotate.interpolate({
            inputRange: [-1, 1],
            outputRange: ['-15deg', '15deg'],
          }) : '0deg'
        },
        { scale: isNextCard ? nextCardScale : 1 }
      ],
      opacity: isNextCard ? nextCardOpacity : 1,
      zIndex: isCurrentCard ? 2 : isNextCard ? 1 : 0,
    };

    return (
      <Animated.View key={item.id} style={[styles.cardContainer, cardStyle]}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
          enabled={isCurrentCard}
        >
          <Animated.View style={styles.carCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.imageUri }} style={styles.carImage} />
              <View style={styles.priceBadge}>
                <Text style={styles.priceBadgeText}>{item.price}</Text>
              </View>
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Text style={styles.carTitle}>{item.title}</Text>
                <Text style={styles.condition}>{item.condition}</Text>
              </View>
              
              <Text style={styles.seller}>{item.seller}</Text>
              
              <View style={styles.detailsRow}>
                <Text style={styles.detailText}>{item.year}</Text>
                <Text style={styles.detailSeparator}>•</Text>
                <Text style={styles.detailText}>{item.mileage}</Text>
                <Text style={styles.detailSeparator}>•</Text>
                <Text style={styles.detailText}>{item.location}</Text>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    );
  };

  if (currentIndex >= sampleCars.length) {
    return (
      <AppScreen>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No more cars to show!</Text>
          <Text style={styles.emptyStateSubtext}>Check back later for new listings</Text>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        {sampleCars.slice(currentIndex, currentIndex + 2).map((item, index) => 
          renderCard(item, currentIndex + index)
        )}
        
        {/* Swipe indicators */}
        <View style={styles.swipeIndicators}>
          <View style={styles.swipeIndicator}>
            <Text style={styles.swipeText}>👈 Pass</Text>
          </View>
          <View style={styles.swipeIndicator}>
            <Text style={styles.swipeText}>Save 👉</Text>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cardContainer: {
    position: 'absolute',
    width: screenWidth - 32,
    height: screenHeight * 0.7,
  },
  carCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: 'rgba(11, 29, 77, 0.2)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: '60%',
  },
  carImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  priceBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(11, 29, 77, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
  },
  priceBadgeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  carTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  condition: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  seller: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  detailSeparator: {
    fontSize: 16,
    color: '#E2E8F0',
    marginHorizontal: 12,
  },
  swipeIndicators: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  swipeIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  swipeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
});
