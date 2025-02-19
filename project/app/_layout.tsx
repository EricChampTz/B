import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  useEffect(() => {
    supabase.auth.getSession();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#fff' },
            animation: Platform.OS === 'web' ? 'none' : 'default',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}