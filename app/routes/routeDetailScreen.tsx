import { Route } from '@/types/transport';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

// Temporary mock data - replace with actual API calls
const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Downtown Express',
    busNumber: '101',
    description: 'Express service to downtown area',
    isActive: true,
    stops: [
      {
        id: 's1',
        name: 'Central Station',
        location: { latitude: 0, longitude: 0 },
        description: 'Main transportation hub'
      }
    ],
    schedules: [
      {
        id: 'sch1',
        routeId: '1',
        stopId: 's1',
        arrivalTime: '08:00',
        departureTime: '08:05',
        dayOfWeek: 1
      }
    ]
  }
];

export default function RouteDetailScreen() {
  const { routeId } = useLocalSearchParams();
  const router = useRouter();
  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the route data from your API
    const foundRoute = mockRoutes.find(r => r.id === routeId);
    if (foundRoute) {
      setRoute(foundRoute);
    }
  }, [routeId]);

  if (!route) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Card className="mb-4">
          <Card.Content>
            <Text className="text-2xl font-bold">{route.name}</Text>
            <Text className="text-xl text-gray-600">Bus {route.busNumber}</Text>
            <Text className="text-gray-500 mt-2">{route.description}</Text>
          </Card.Content>
        </Card>

        <Card className="mb-4">
          <Card.Content>
            <Text className="text-xl font-bold mb-2">Stops</Text>
            {route.stops.map((stop) => (
              <View key={stop.id} className="mb-2">
                <Text className="font-semibold">{stop.name}</Text>
                {stop.description && (
                  <Text className="text-gray-500">{stop.description}</Text>
                )}
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Text className="text-xl font-bold mb-2">Schedule</Text>
            {route.schedules.map((schedule) => (
              <View key={schedule.id} className="mb-2">
                <Text className="font-semibold">
                  {schedule.arrivalTime} - {schedule.departureTime}
                </Text>
                <Text className="text-gray-500">
                  Day {schedule.dayOfWeek}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Button 
          mode="outlined" 
          onPress={() => router.back()}
          className="mt-4"
        >
          Back to Routes
        </Button>
      </View>
    </ScrollView>
  );
}