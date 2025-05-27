import { Stack, Tabs } from 'expo-router'
import { Bus, Car, Home, Plus, Save, Search } from "lucide-react-native"
import React from 'react'

const _Layout = () => {
  return (
   <Tabs
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
      },
      tabBarActiveTintColor: '#8A2BE2', // Violet color to match your app theme
      tabBarInactiveTintColor: '#6B7280',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
    }}
   >
    <Tabs.Screen
      name='AddRouteScreen'
      options={{
        title: 'AddRouteScreen',
        tabBarIcon: ({color, size}) => <Plus size={24} color={color}/>,
        headerShown: false
      }}
    />

     <Tabs.Screen
      name='bookings'
      options={{
        title: 'BookingScreen',
        tabBarIcon: ({color, size}) => <Search size={24} color={color}/>,
        headerShown: false
      }}
    />
     <Tabs.Screen
      name='routeDetail'    
      options={{
        title: 'RouteDetail',
        tabBarIcon: ({color, size}) => <Bus size={24} color={color}/>,
        headerShown: false
      }}
    />
    <Tabs.Screen
      name='routesList'
      options={{
        title: 'RoutesList',
        tabBarIcon: ({color, size}) => <Bus size={24} color={color}/>,
        headerShown: false
      }}
    />
   </Tabs>
  )
}

export default _Layout