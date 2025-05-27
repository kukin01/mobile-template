import { Route } from '@/types/transport';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Card, Searchbar } from 'react-native-paper';

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

export default function RoutesList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [routes] = useState<Route[]>(mockRoutes);
  
  const handleRouteSelect = (route: Route) => {
    router.push({
      pathname: '/(tabs)/routeDetail',
      params: { routeId: route.id }
    });
  };

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.busNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRouteItem = ({ item }: { item: Route }) => (
    <Pressable onPress={() => handleRouteSelect(item)}>
      <Card className="m-2 p-4 bg-white">
        <Card.Content>
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-bold">{item.busNumber}</Text>
              <Text className="text-gray-600">{item.name}</Text>
            </View>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-800">
                {item.stops.length} stops
              </Text>
            </View>
          </View>
          {item.description && (
            <Text className="text-gray-500 mt-2">{item.description}</Text>
          )}
        </Card.Content>
      </Card>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        <Searchbar
          placeholder="Search routes..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="bg-white"
        />
      </View>
      <FlatList
        data={filteredRoutes}
        renderItem={renderRouteItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
}