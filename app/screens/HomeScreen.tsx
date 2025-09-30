import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Image, Animated, Dimensions, Pressable, Easing, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import AppScreen from './AppScreen';
import { useCarContext } from '../context/CarContext';

// Sample car data
const sampleCars = [
  {
    id: '1',
    year: '2020',
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Long Range',
    price: '$34,990',
    miles: '12,400',
    city: 'San Jose',
    state: 'CA',
    titleStatus: 'Clean Title',
    imageUri: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'AutoMax Dealers',
    // Additional images for carousel
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
    ],
    // Deal tier
    dealTier: 'Great Deal',
    // Listing date
    listedDate: '2024-01-15',
    // Vehicle specs
    transmission: 'Automatic',
    fuelType: 'Electric',
    exteriorColor: 'Pearl White',
    interiorColor: 'Black',
    seats: 5,
    // Description and pros/cons
    description: 'Well-maintained Tesla Model 3 with low mileage and clean history. Perfect for daily commuting with excellent range and performance.',
    pros: ['Low mileage', 'Clean title', 'Excellent range', 'Autopilot included'],
    cons: ['Minor door ding on passenger side', 'Tires need replacement in 6 months'],
    // Legacy fields
    title: 'Tesla Model 3',
    mileage: '12,400 mi',
    location: 'San Jose, CA',
    details: '2020 • 12,400 mi • San Jose, CA'
  },
  {
    id: '2',
    year: '2019',
    make: 'BMW',
    model: '3 Series',
    trim: '330i',
    price: '$28,500',
    miles: '18,200',
    city: 'San Francisco',
    state: 'CA',
    titleStatus: 'Clean Title',
    imageUri: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'Bay Area Motors',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
    ],
    dealTier: 'Fair Deal',
    listedDate: '2024-02-20',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    exteriorColor: 'Alpine White',
    interiorColor: 'Black Dakota Leather',
    seats: 5,
    description: 'Sporty BMW 3 Series with premium features and excellent driving dynamics. Well-maintained with service records.',
    pros: ['Sporty handling', 'Premium interior', 'Good fuel economy', 'Reliable engine'],
    cons: ['Higher maintenance costs', 'Some wear on driver seat'],
    title: 'BMW 3 Series',
    mileage: '18,200 mi',
    location: 'San Francisco, CA',
    details: '2019 • 18,200 mi • San Francisco, CA'
  },
  {
    id: '3',
    year: '2021',
    make: 'Audi',
    model: 'A4',
    trim: 'Premium',
    price: '$32,000',
    miles: '8,900',
    city: 'Oakland',
    state: 'CA',
    titleStatus: 'Clean Title',
    imageUri: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'Premium Auto',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
    ],
    dealTier: 'Good Deal',
    listedDate: '2024-03-10',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    exteriorColor: 'Mythos Black',
    interiorColor: 'Black Leather',
    seats: 5,
    description: 'Luxury Audi A4 with premium features and low mileage. Perfect condition with full service history.',
    pros: ['Low mileage', 'Luxury features', 'Excellent build quality', 'Good resale value'],
    cons: ['Premium fuel required', 'Higher insurance costs'],
    title: 'Audi A4',
    mileage: '8,900 mi',
    location: 'Oakland, CA',
    details: '2021 • 8,900 mi • Oakland, CA'
  },
  {
    id: '4',
    year: '2020',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    trim: 'C300',
    price: '$38,500',
    miles: '15,600',
    city: 'Palo Alto',
    state: 'CA',
    titleStatus: 'Clean Title',
    imageUri: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'Luxury Cars Inc',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
    ],
    dealTier: 'Fair Deal',
    listedDate: '2023-12-05',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    exteriorColor: 'Obsidian Black',
    interiorColor: 'Black MB-Tex',
    seats: 5,
    description: 'Elegant Mercedes C-Class with premium amenities and smooth ride. Well-maintained luxury sedan.',
    pros: ['Luxury interior', 'Smooth ride', 'Premium brand', 'Good performance'],
    cons: ['Higher maintenance costs', 'Depreciation'],
    title: 'Mercedes C-Class',
    mileage: '15,600 mi',
    location: 'Palo Alto, CA',
    details: '2020 • 15,600 mi • Palo Alto, CA'
  },
  {
    id: '5',
    year: '2022',
    make: 'Honda',
    model: 'Civic',
    trim: 'Sport',
    price: '$22,000',
    miles: '5,200',
    city: 'Fremont',
    state: 'CA',
    titleStatus: 'Clean Title',
    imageUri: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'Reliable Motors',
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop'
    ],
    dealTier: 'Great Deal',
    listedDate: '2024-04-15',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    exteriorColor: 'Rallye Red',
    interiorColor: 'Black Cloth',
    seats: 5,
    description: 'Sporty Honda Civic with manual transmission and low mileage. Perfect for enthusiasts who love driving.',
    pros: ['Very low mileage', 'Manual transmission', 'Great fuel economy', 'Reliable brand'],
    cons: ['Manual transmission not for everyone', 'Smaller back seat'],
    title: 'Honda Civic',
    mileage: '5,200 mi',
    location: 'Fremont, CA',
    details: '2022 • 5,200 mi • Fremont, CA'
  },
  {
    id: '6',
    year: '2021',
    make: 'Toyota',
    model: 'Camry',
    trim: 'LE',
    price: '$25,500',
    miles: '11,800',
    city: 'San Mateo',
    state: 'CA',
    titleStatus: 'Clean Title',
    imageUri: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    condition: 'Used',
    seller: 'Toyota Direct',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
    ],
    dealTier: 'Good Deal',
    listedDate: '2024-01-30',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    exteriorColor: 'Silver Sky Metallic',
    interiorColor: 'Black Fabric',
    seats: 5,
    description: 'Reliable Toyota Camry with excellent fuel economy and low maintenance costs. Perfect family sedan.',
    pros: ['Reliable brand', 'Good fuel economy', 'Low maintenance', 'Spacious interior'],
    cons: ['Conservative styling', 'Basic features'],
    title: 'Toyota Camry',
    mileage: '11,800 mi',
    location: 'San Mateo, CA',
    details: '2021 • 11,800 mi • San Mateo, CA'
  }
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.4;

// Function to determine if price is good
const isGoodPrice = (price: string, year: string, make: string): boolean => {
  const priceNum = parseInt(price.replace(/[$,]/g, ''));
  const yearNum = parseInt(year);
  
  // Simple logic: newer cars with lower prices relative to their year are considered good deals
  // This is a basic heuristic - in a real app, you'd compare against market data
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearNum;
  
  if (make.toLowerCase().includes('tesla') || make.toLowerCase().includes('mercedes') || make.toLowerCase().includes('bmw')) {
    // Luxury brands - good if under $40k for recent years
    return priceNum < 40000;
  } else if (make.toLowerCase().includes('honda') || make.toLowerCase().includes('toyota')) {
    // Reliable brands - good if under $30k
    return priceNum < 30000;
  } else {
    // Other brands - good if under $35k
    return priceNum < 35000;
  }
};

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

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const [swipeText, setSwipeText] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [carouselIndices, setCarouselIndices] = useState<Record<number, number>>({});
  const [isFullScreenImage, setIsFullScreenImage] = useState(false);
  const [fullScreenImages, setFullScreenImages] = useState<string[]>([]);
  const [fullScreenStartIndex, setFullScreenStartIndex] = useState(0);
  const { addCar, isCarSaved } = useCarContext();
  
  // Card stack animations - each card has its own animated values
  const cardAnimations = useRef(
    sampleCars.map((_, index) => ({
      opacity: new Animated.Value(index === 0 ? 1 : 0),
      scale: new Animated.Value(index === 0 ? 1 : 0.8),
      translateY: new Animated.Value(index === 0 ? 0 : 20),
      flipRotation: new Animated.Value(0), // 0 = front, 1 = back
    }))
  ).current;

  // Animate card stack when currentIndex changes
  useEffect(() => {
    // Set transitioning state and clear swipe text
    setIsTransitioning(true);
    setSwipeText('');
    
    // Reset current card animations instantly
    translateX.setValue(0);
    translateY.setValue(0);
    rotate.setValue(0);
    
    // Hide all cards that are no longer visible first
    for (let i = 0; i < cardAnimations.length; i++) {
      if (i < currentIndex) {
        // Hide cards that have been swiped away
        cardAnimations[i].opacity.setValue(0);
        cardAnimations[i].scale.setValue(0.8);
        cardAnimations[i].translateY.setValue(20);
      }
    }
    
    // Animate the card stack with staggered timing
    const animateCardStack = () => {
      const animations = [];
      
      // Animate each visible card in the stack
      for (let i = 0; i < Math.min(3, sampleCars.length - currentIndex); i++) {
        const cardIndex = currentIndex + i;
        const cardAnim = cardAnimations[cardIndex];
        
        if (i === 0) {
          // Current card (top of stack) - animate in quickly
          animations.push(
            Animated.parallel([
              Animated.timing(cardAnim.opacity, {
                toValue: 1,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(cardAnim.scale, {
                toValue: 1,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(cardAnim.translateY, {
                toValue: 0,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
            ])
          );
        } else {
          // Cards behind the current one - animate in with slight delay
          const delay = i * 50; // Shorter staggered delay
          animations.push(
            Animated.parallel([
              Animated.timing(cardAnim.opacity, {
                toValue: 0.7 - (i * 0.1),
                duration: 300,
                delay,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(cardAnim.scale, {
                toValue: 0.9 - (i * 0.05),
                duration: 300,
                delay,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(cardAnim.translateY, {
                toValue: 15 + (i * 8),
                duration: 300,
                delay,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
            ])
          );
        }
      }
      
      // Start all animations
      Animated.parallel(animations).start(() => {
        // Clear transitioning state when animation completes
        setIsTransitioning(false);
      });
    };
    
    // Start animation immediately for smoother transition
    animateCardStack();
  }, [currentIndex]);

  const onGestureEvent = (event: any) => {
    const translationX = event.nativeEvent.translationX;
    const absX = Math.abs(translationX);
    
    console.log('Gesture event:', { translationX, absX, currentIndex, currentCar: sampleCars[currentIndex]?.title });
    
    // Update animated values
    translateX.setValue(translationX);
    
    // Ensure current card maintains full opacity during swipe
    if (currentIndex < cardAnimations.length) {
      cardAnimations[currentIndex].opacity.setValue(1);
    }
    
    if (absX > 30) {
      // Set text based on direction
      if (translationX > 0) {
        setSwipeText('SAVE');
        console.log('Setting SAVE');
      } else {
        setSwipeText('PASS');
        console.log('Setting PASS');
      }
    } else {
      setSwipeText('');
      console.log('Clearing text');
    }
  };

  const handleCarouselScroll = (event: any, cardIndex: number) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const imageIndex = Math.round(contentOffsetX / (screenWidth - 40));
    setCarouselIndices(prev => ({ ...prev, [cardIndex]: imageIndex }));
  };

  const openFullScreenImage = (images: string[], startIndex: number) => {
    setFullScreenImages(images);
    setFullScreenStartIndex(startIndex);
    setIsFullScreenImage(true);
  };

  const handleCardFlip = (cardIndex: number) => {
    console.log('Card flip attempt:', { 
      cardIndex, 
      currentIndex, 
      isCurrentCard: cardIndex === currentIndex,
      currentFlippedCards: Array.from(flippedCards)
    });
    
    // Only allow flipping the current card
    if (cardIndex !== currentIndex) {
      console.log('Not current card, ignoring flip');
      return;
    }
    
    const isFlipped = flippedCards.has(cardIndex);
    const newFlippedCards = new Set(flippedCards);
    
    if (isFlipped) {
      newFlippedCards.delete(cardIndex);
      console.log('Flipping back to front - removing from set');
    } else {
      newFlippedCards.add(cardIndex);
      console.log('Flipping to back - adding to set');
    }
    
    console.log('New flipped cards will be:', Array.from(newFlippedCards));
    setFlippedCards(newFlippedCards);
    
    // Simple scale animation for visual feedback (no complex rotation)
    if (cardAnimations[cardIndex]?.scale) {
      console.log('Starting scale animation');
      Animated.sequence([
        Animated.timing(cardAnimations[cardIndex].scale, {
          toValue: 0.95,
          duration: 100,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(cardAnimations[cardIndex].scale, {
          toValue: 1,
          duration: 100,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === 5) { // END state
      const { translationX, velocityX } = event.nativeEvent;
      console.log('Gesture ended:', { translationX, velocityX, currentIndex, currentCar: sampleCars[currentIndex]?.title });
      
      if (Math.abs(translationX) > SWIPE_THRESHOLD || Math.abs(velocityX) > 800) {
        // Swipe left or right
        const direction = translationX > 0 ? 1 : -1;
        const toValue = direction * screenWidth;
        
        // Save car if swiping right (positive direction)
        if (direction > 0 && currentIndex < sampleCars.length) {
          const currentCar = sampleCars[currentIndex];
          if (!isCarSaved(currentCar.id)) {
            addCar({
              id: currentCar.id,
              imageUri: currentCar.imageUri,
              images: currentCar.images,
              year: currentCar.year,
              make: currentCar.make,
              model: currentCar.model,
              trim: currentCar.trim,
              price: currentCar.price,
              miles: currentCar.miles,
              city: currentCar.city,
              state: currentCar.state,
              titleStatus: currentCar.titleStatus,
              condition: currentCar.condition,
              seller: currentCar.seller,
              dealTier: currentCar.dealTier,
              listedDate: currentCar.listedDate,
              transmission: currentCar.transmission,
              fuelType: currentCar.fuelType,
              exteriorColor: currentCar.exteriorColor,
              interiorColor: currentCar.interiorColor,
              seats: currentCar.seats,
              description: currentCar.description,
              pros: currentCar.pros,
              cons: currentCar.cons,
              // Legacy fields for backward compatibility - provide defaults if not available
              title: currentCar.title || `${currentCar.year} ${currentCar.make} ${currentCar.model}`,
              details: currentCar.details || `${currentCar.year} • ${currentCar.miles} mi • ${currentCar.city}, ${currentCar.state}`
            });
          }
        }
        
        // Set transitioning state and clear swipe text
        setIsTransitioning(true);
        setSwipeText('');
        
        // Animate current card out
        Animated.parallel([
          Animated.timing(translateX, {
            toValue,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: direction * 100,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(rotate, {
            toValue: direction * 0.3,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          // Fade out the current card
          Animated.timing(cardAnimations[currentIndex].opacity, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          // Scale down the current card
          Animated.timing(cardAnimations[currentIndex].scale, {
            toValue: 0.8,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Move to next card after animation completes
          setCurrentIndex(prev => prev + 1);
        });
      } else {
        // Return to center
        setSwipeText(''); // Clear text immediately
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
        ]).start(() => {
          setSwipeText('');
        });
      }
    }
  };

  const renderCard = (item: typeof sampleCars[0], index: number) => {
    const isCurrentCard = index === currentIndex;
    const isVisible = index >= currentIndex && index < currentIndex + 3;
    
    if (!isVisible) return null;
    
    const cardAnim = cardAnimations[index];
    const stackPosition = index - currentIndex;
    
    let cardStyle;
    
    if (isCurrentCard) {
      // Current card - can be swiped
      cardStyle = {
        transform: [
          { translateX: translateX },
          { translateY: translateY },
          { 
            rotate: rotate.interpolate({
              inputRange: [-1, 1],
              outputRange: ['-15deg', '15deg'],
              extrapolate: 'clamp',
            })
          },
          { scale: cardAnim.scale }
        ],
        opacity: cardAnim.opacity,
        zIndex: 10, // Always on top when current
      };
    } else {
      // Cards behind the current one - show next 2 cards
      const shouldShow = stackPosition > 0 && stackPosition <= 2;
      cardStyle = {
        transform: [
          { translateX: 0 },
          { translateY: cardAnim.translateY },
          { rotate: '0deg' },
          { scale: cardAnim.scale }
        ],
        opacity: shouldShow ? cardAnim.opacity : 0, // Hide if not in next 2 cards
        zIndex: shouldShow ? 5 - stackPosition : -1, // Lower z-index for cards behind
      };
    }

    const isFlipped = flippedCards.has(index);

    console.log('Rendering card:', { 
      index, 
      isCurrentCard: index === currentIndex, 
      isFlipped, 
      isVisible,
      flippedCardsArray: Array.from(flippedCards)
    });

    return (
      <Animated.View key={item.id} style={[styles.cardContainer, cardStyle]}>
        <View style={styles.carCard}>
          {!isFlipped ? (
            /* Front of card */
            <View style={styles.cardFront}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.imageUri }} style={styles.carImage} />
                <View style={styles.imageOverlay} />
                <View style={[styles.priceBadge, { backgroundColor: getDealTierColor(item.dealTier) }]}>
                  <Text style={styles.priceBadgeText}>{item.price}</Text>
                </View>
              </View>
              
              <View style={styles.cardDetails}>
                <View style={styles.titleRow}>
                  <Text style={styles.carTitle}>{item.year} {item.make} {item.model} {item.trim}</Text>
                </View>
                
                <View style={styles.milesLocationRow}>
                  <Text style={styles.milesLocationText}>{item.miles} mi • {item.city}, {item.state}</Text>
                </View>
                
                <View style={styles.titleStatusRow}>
                  <Text style={styles.titleStatusText}>{item.titleStatus}</Text>
                </View>
              </View>
            </View>
          ) : (
            /* Back of card */
            <View style={styles.cardBack}>
              <ScrollView 
                style={styles.scrollContainer} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                nestedScrollEnabled={true}
              >
                {/* Image Carousel */}
                <View style={styles.imageCarousel}>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    style={styles.carouselScroll}
                    onMomentumScrollEnd={(event) => handleCarouselScroll(event, index)}
                  >
                    {item.images?.map((imageUri, imgIndex) => (
                      <TouchableOpacity 
                        key={imgIndex}
                        activeOpacity={0.9}
                        onPress={() => openFullScreenImage(item.images || [], imgIndex)}
                      >
                        <Image 
                          source={{ uri: imageUri }} 
                          style={styles.carouselImage} 
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View style={styles.imageCounter}>
                    <Text style={styles.imageCounterText}>
                      {(carouselIndices[index] ?? 0) + 1} / {item.images?.length || 1}
                    </Text>
                  </View>
                </View>

                {/* Compact Header with Price and Deal Badge */}
                <View style={styles.backHeaderCompact}>
                  <View style={styles.backHeaderTop}>
                    <View style={styles.backHeaderLeft}>
                      <Text style={styles.backPrice}>{item.price}</Text>
                      <View style={[styles.dealTierBadgeCompact, { backgroundColor: getDealTierColor(item.dealTier) }]}>
                        <Text style={styles.dealTierTextCompact}>{item.dealTier}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.backVehicleTitleCompact}>{item.year} {item.make} {item.model} {item.trim}</Text>
                  <View style={styles.quickInfoRow}>
                    <Text style={styles.quickInfoText}>{item.miles} mi</Text>
                    <Text style={styles.quickInfoDivider}>•</Text>
                    <Text style={styles.quickInfoText}>{item.city}, {item.state}</Text>
                    <Text style={styles.quickInfoDivider}>•</Text>
                    <Text style={styles.quickInfoText}>{getTimeSinceListing(item.listedDate)}</Text>
                  </View>
                </View>

                {/* Key Details Grid - Most Important Info */}
                <View style={styles.keyDetailsSection}>
                  <View style={styles.keyDetailItem}>
                    <Text style={styles.keyDetailLabel}>Mileage</Text>
                    <Text style={styles.keyDetailValue}>{item.miles} mi</Text>
                  </View>
                  <View style={styles.keyDetailItem}>
                    <Text style={styles.keyDetailLabel}>Title</Text>
                    <Text style={styles.keyDetailValue}>{item.titleStatus}</Text>
                  </View>
                  <View style={styles.keyDetailItem}>
                    <Text style={styles.keyDetailLabel}>Transmission</Text>
                    <Text style={styles.keyDetailValue}>{item.transmission}</Text>
                  </View>
                  <View style={styles.keyDetailItem}>
                    <Text style={styles.keyDetailLabel}>Fuel Type</Text>
                    <Text style={styles.keyDetailValue}>{item.fuelType}</Text>
                  </View>
                  <View style={styles.keyDetailItem}>
                    <Text style={styles.keyDetailLabel}>Exterior</Text>
                    <Text style={styles.keyDetailValue}>{item.exteriorColor}</Text>
                  </View>
                  <View style={styles.keyDetailItem}>
                    <Text style={styles.keyDetailLabel}>Interior</Text>
                    <Text style={styles.keyDetailValue}>{item.interiorColor}</Text>
                  </View>
                </View>

                {/* Pros and Cons Side by Side */}
                <View style={styles.prosConsCompact}>
                  <View style={styles.prosColumnCompact}>
                    <Text style={styles.prosConsTitleCompact}>Pros</Text>
                    {item.pros?.slice(0, 3).map((pro, idx) => (
                      <Text key={idx} style={styles.prosTextCompact}>• {pro}</Text>
                    ))}
                  </View>
                  <View style={styles.consColumnCompact}>
                    <Text style={styles.prosConsTitleCompact}>Cons</Text>
                    {item.cons?.slice(0, 3).map((con, idx) => (
                      <Text key={idx} style={styles.consTextCompact}>• {con}</Text>
                    ))}
                  </View>
                </View>

                {/* Description - Condensed */}
                <View style={styles.descriptionCompact}>
                  <Text style={styles.descriptionTextCompact}>{item.description}</Text>
                </View>

                {/* Seller Info - Compact */}
                <View style={styles.sellerCompact}>
                  <Text style={styles.sellerLabel}>Seller</Text>
                  <Text style={styles.sellerNameCompact}>{item.seller}</Text>
                </View>
              </ScrollView>
            </View>
          )}

          {/* Dynamic swipe overlay - only show during active swiping, not during transitions */}
          {isCurrentCard && swipeText && !isTransitioning && (
            <View style={[
              styles.swipeOverlay,
              {
                opacity: 0.8,
              }
            ]}>
              <Text style={[
                styles.swipeOverlayText,
                {
                  color: swipeText === 'SAVE' ? '#10B981' : swipeText === 'PASS' ? '#EF4444' : '#FFFFFF'
                }
              ]}>
                {swipeText}
              </Text>
            </View>
          )}
          
        </View>
      </Animated.View>
    );
  };

  if (currentIndex >= sampleCars.length) {
    return (
      <AppScreen>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No more cars to show!</Text>
          <Text style={styles.emptyStateSubtext}>You've seen all available cars.{'\n'}Check back later for new listings!</Text>
          <Pressable style={styles.refreshButton}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </Pressable>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <PanGestureHandler
          key={currentIndex}
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
          activeOffsetX={[-5, 5]}
          failOffsetY={[-10, 10]}
          minPointers={1}
          maxPointers={1}
          enabled={!flippedCards.has(currentIndex)}
        >
          <Animated.View style={styles.cardsContainer}>
            {sampleCars.map((item, index) => {
              return renderCard(item, index);
            })}
          </Animated.View>
        </PanGestureHandler>
        
        {/* Flip Button */}
        <Pressable 
          style={styles.flipButton}
          onPress={() => handleCardFlip(currentIndex)}
        >
          <Text style={styles.flipButtonText}>
            Flip
          </Text>
        </Pressable>

        {/* Full Screen Image Modal */}
        <Modal
          visible={isFullScreenImage}
          transparent={false}
          animationType="fade"
          onRequestClose={() => setIsFullScreenImage(false)}
        >
          <View style={styles.fullScreenContainer}>
            <Pressable 
              style={styles.closeButton}
              onPress={() => setIsFullScreenImage(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
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
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    position: 'absolute',
    width: screenWidth - 40,
    height: screenHeight * 0.68,
  },
  carCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
  },
  cardFront: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  cardBack: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardDetails: {
    flex: 1,
    padding: 28,
    paddingTop: 24,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  imageCarousel: {
    height: 300,
    position: 'relative',
  },
  carouselScroll: {
    flex: 1,
  },
  carouselImage: {
    width: screenWidth - 40,
    height: 300,
    resizeMode: 'cover',
  },
  imageCounter: {
    position: 'absolute',
    top: 16,
    right: 16,
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
  imageContainer: {
    position: 'relative',
    height: '65%',
  },
  carImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  priceBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  priceBadgeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  titleRow: {
    marginBottom: 20,
  },
  carTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  milesLocationRow: {
    marginBottom: 16,
  },
  milesLocationText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
    lineHeight: 22,
  },
  titleStatusRow: {
    marginBottom: 0,
  },
  titleStatusText: {
    fontSize: 14,
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    fontWeight: '600',
    alignSelf: 'flex-start',
    letterSpacing: 0.3,
  },
  swipeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 24,
  },
  swipeOverlayText: {
    fontSize: 56,
    fontWeight: '900',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#F8FAFC',
  },
  emptyStateText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  emptyStateSubtext: {
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '500',
  },
  refreshButton: {
    marginTop: 32,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  flipButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 160,
  },
  flipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
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
  closeButtonText: {
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

