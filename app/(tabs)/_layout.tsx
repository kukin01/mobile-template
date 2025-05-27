import { Stack, Tabs } from 'expo-router'
import { Bus, Car, Home, Plus, List,User } from "lucide-react-native"
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
      name='AddExpense'
      options={{
        title: 'AddExpense',
        tabBarIcon: ({color, size}) => <Plus size={24} color={color}/>,
        headerShown: false
      }}
    />

     <Tabs.Screen
      name='details'
      options={{
        title: 'Details',
        tabBarIcon: ({color, size}) => <Bus size={24} color={color}/>,
        headerShown: false
      }}
    />
    <Tabs.Screen
      name='expenseList'
      options={{
        title: 'ExpenseList',
        tabBarIcon: ({color, size}) => <List size={24} color={color}/>,
        headerShown: false
      }}
    />
    <Tabs.Screen
      name='ownerExpenses'
      options={{
        title: 'OwnerExpenses',
        tabBarIcon: ({color, size}) => <User size={24} color={color}/>,
        headerShown: false
      }}
    />
   </Tabs>
  )
}

export default _Layout