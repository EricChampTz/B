import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function AppLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}