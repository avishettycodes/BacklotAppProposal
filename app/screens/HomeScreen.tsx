import React, { useState, useRef } from 'react';
import AppScreen from './AppScreen';
import CarCard from '../components/CarCard';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { useCarContext } from '../context/CarContext';

export default function HomeScreen() {
  const { addCar } = useCarContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  
  const mockCars = [
    {
      id: '1',
      imageUri: 'https://picsum.photos/seed/car1/1200/800',
      title: '2020 Tesla Model 3',
      price: '$34,990',
      details: '12,400 mi • San Jose, CA',
    },
    {
      id: '2',
      imageUri: 'https://picsum.photos/seed/car2/1200/800',
      title: '2019 BMW X5',
      price: '$42,500',
      details: '45,210 mi • Fremont, CA',
    },
  ];

  const onGestureEvent = Animated.event(
    [
      { nativeEvent: { translationX: translateX } },
      { nativeEvent: { translationY: translateY } }
    ],
    { useNativeDriver: false }
  );

  // Add visual feedback during horizontal swipe
  const swipeOpacity = translateX.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  // Add scale effect during horizontal swipe
  const swipeScale = translateX.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.95, 1, 0.95],
    extrapolate: 'clamp',
  });

    const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      if (translationX > 100) {
        setSwipeDirection('right');
      } else if (translationX < -100) {
        setSwipeDirection('left');
      } else {
        setSwipeDirection(null);
      }
    }
    
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      
      if (Math.abs(translationX) > 100) {
        // Swipe threshold met, handle card action
        const currentCar = mockCars[currentIndex];
        
        if (translationX > 0) {
          // Swipe right - Save the car
          addCar(currentCar);
          console.log('Car saved:', currentCar.title);
        } else {
          // Swipe left - Remove/reject the car
          console.log('Car removed:', currentCar.title);
        }
        
        // Animate card off screen
        const direction = translationX > 0 ? 1 : -1;
        Animated.spring(translateX, {
          toValue: direction * 500,
          useNativeDriver: false,
          tension: 100,
          friction: 8,
        }).start(() => {
          // Reset animations and move to next card
          translateX.setValue(0);
          translateY.setValue(0);
          setSwipeDirection(null);
          setCurrentIndex(prev => {
            const nextIndex = prev + 1;
            if (nextIndex >= mockCars.length) {
              return 0; // Loop back to first card
            }
            return nextIndex;
          });
        });
      } else {
        // Reset to center
        setSwipeDirection(null);
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: false,
          }),
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
          }),
        ]).start();
      }
    }
  };

  const handleCardPress = (carId: string) => {
    console.log('Card pressed:', carId);
  };



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppScreen>
        <View style={styles.container}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <Text style={styles.logo}>BACKLOT</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Card Area */}
          <View style={styles.cardArea}>
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onHandlerStateChange}
            >
              <Animated.View style={[styles.cardWrapper, {
                opacity: swipeOpacity,
                transform: [
                  { translateX },
                  { translateY },
                  { scale: swipeScale }
                ]
              }]}>
                                 <CarCard
                   imageUri={mockCars[currentIndex].imageUri}
                   title={mockCars[currentIndex].title}
                   price={mockCars[currentIndex].price}
                   details={mockCars[currentIndex].details}
                   onPress={() => handleCardPress(mockCars[currentIndex].id)}
                 />
                 
                 {/* Swipe direction indicators */}
                 <Animated.View style={[styles.swipeIndicator, styles.rightIndicator, {
                   opacity: translateX.interpolate({
                     inputRange: [0, 50, 200],
                     outputRange: [0, 0.5, 1],
                     extrapolate: 'clamp',
                   }),
                   transform: [{
                     translateX: translateX.interpolate({
                       inputRange: [0, 200],
                       outputRange: [0, 20],
                       extrapolate: 'clamp',
                     })
                   }]
                 }]}>
                   <Text style={styles.swipeIndicatorText}>SAVE</Text>
                 </Animated.View>
                 
                 <Animated.View style={[styles.swipeIndicator, styles.leftIndicator, {
                   opacity: translateX.interpolate({
                     inputRange: [-200, -50, 0],
                     outputRange: [1, 0.5, 0],
                     extrapolate: 'clamp',
                   }),
                   transform: [{
                     translateX: translateX.interpolate({
                       inputRange: [-200, 0],
                       outputRange: [-20, 0],
                       extrapolate: 'clamp',
                     })
                   }]
                 }]}>
                                      <Text style={styles.swipeIndicatorText}>REMOVE</Text>
                 </Animated.View>

                 {/* Action feedback overlay */}
                 <Animated.View style={[styles.actionOverlay, {
                   opacity: translateX.interpolate({
                     inputRange: [-200, -100, 0, 100, 200],
                     outputRange: [0, 0.8, 0, 0.8, 0],
                     extrapolate: 'clamp',
                   }),
                   backgroundColor: translateX.interpolate({
                     inputRange: [-200, 0, 200],
                     outputRange: ['rgba(239, 68, 68, 0.2)', 'transparent', 'rgba(34, 197, 94, 0.2)'],
                     extrapolate: 'clamp',
                   }),
                 }]}>
                   <Text style={[styles.actionText, {
                     color: translateX.interpolate({
                       inputRange: [-200, 0, 200],
                       outputRange: ['#EF4444', '#000000', '#22C55E'],
                       extrapolate: 'clamp',
                     }) as any,
                   }]}>
                     {swipeDirection === 'right' ? 'SAVED' : swipeDirection === 'left' ? 'REMOVED' : ''}
                   </Text>
                 </Animated.View>
               </Animated.View>
             </PanGestureHandler>
            
            {/* Swipe hint text */}
            <View style={styles.swipeHint}>
              <Text style={styles.swipeHintText}>Swipe right to save • Swipe left to remove</Text>
            </View>
          </View>
        </View>
      </AppScreen>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#F8FAFF',
  },
  logo: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0B1D4D',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 16,
  },
  separatorLine: {
    height: 2,
    backgroundColor: '#E2E8F0',
    borderRadius: 1,
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardWrapper: {
    width: '100%',
  },
  swipeIndicator: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 3,
  },
  rightIndicator: {
    top: 20,
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    borderColor: '#22C55E',
  },
  leftIndicator: {
    bottom: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    borderColor: '#EF4444',
  },
  swipeIndicatorText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  actionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  actionText: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  swipeHint: {
    marginTop: 20,
    alignItems: 'center',
  },
  swipeHintText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
