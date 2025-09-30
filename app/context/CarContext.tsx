import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Car {
  id: string;
  imageUri: string;
  images?: string[];
  year: string;
  make: string;
  model: string;
  trim: string;
  price: string;
  miles: string;
  city: string;
  state: string;
  titleStatus: string;
  condition: string;
  seller: string;
  dealTier?: string;
  listedDate?: string;
  transmission?: string;
  fuelType?: string;
  exteriorColor?: string;
  interiorColor?: string;
  seats?: number;
  description?: string;
  pros?: string[];
  cons?: string[];
  // Legacy fields for backward compatibility - provide defaults
  title: string;
  details: string;
}

interface CarContextType {
  savedCars: Car[];
  addCar: (car: Car) => void;
  removeCar: (carId: string) => void;
  isCarSaved: (carId: string) => boolean;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  return context;
};

interface CarProviderProps {
  children: ReactNode;
}

export const CarProvider: React.FC<CarProviderProps> = ({ children }) => {
  const [savedCars, setSavedCars] = useState<Car[]>([]);

  const addCar = (car: Car) => {
    setSavedCars(prev => {
      if (!prev.find(c => c.id === car.id)) {
        return [...prev, car];
      }
      return prev;
    });
  };

  const removeCar = (carId: string) => {
    setSavedCars(prev => prev.filter(car => car.id !== carId));
  };

  const isCarSaved = (carId: string) => {
    return savedCars.some(car => car.id === carId);
  };

  return (
    <CarContext.Provider value={{ savedCars, addCar, removeCar, isCarSaved }}>
      {children}
    </CarContext.Provider>
  );
};
