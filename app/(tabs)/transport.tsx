import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';

export default function TransportScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <FAB
        icon="plus"
        className="absolute bottom-4 right-4"
        onPress={() => router.push('/AddRouteScreen')}
      />
    </View>
  );
} 