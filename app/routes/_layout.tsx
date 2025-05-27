import { Stack } from 'expo-router';

export default function RoutesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="RoutesList"
        options={{
          title: 'Routes',
          headerShown: true
        }}
      />
      <Stack.Screen
        name="routeDetailScreen"
        options={{
          title: 'Route Details',
          headerShown: true
        }}
      />
    
    </Stack>
  );
} 