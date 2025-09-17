// app/screens/AppScreen.tsx
import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

type Props = { children: React.ReactNode };

export default function AppScreen({ children }: Props) {
  const insets = useSafeAreaInsets(); // never frozen; just numbers

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F8FAFC',
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        // intentionally NOT paddingBottom so the tab bar owns the bottom
      }}
    >
      <StatusBar style="dark" />
      {children}
    </View>
  );
}
