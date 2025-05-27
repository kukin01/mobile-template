import { useAuth } from '@/hooks/useAuth';
import { Expense } from '@/types/expenses';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';

const API_URL = 'https://67ac71475853dfff53dab929.mockapi.io/api/v1/expenses';

export default function RouteDetailScreen() {
  const { expenseId } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExpense = useCallback(async () => {
    if (!expenseId) {
      setExpense(null);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/${expenseId}`);
      if (response.data) {
        if (response.data.userId !== user?.id) {
          Alert.alert(
            'Access Denied',
            'You can only view details of expenses you created.',
            [
              {
                text: 'OK',
                onPress: () => router.replace('/(tabs)/expenseList')
              }
            ]
          );
          return;
        }
        setExpense(response.data);
      } else {
        // If expense not found (was deleted), navigate back
        router.replace('/(tabs)/expenseList');
      }
    } catch (error) {
      // If there's an error (like 404 for deleted item), navigate back
      router.replace('/(tabs)/expenseList');
    } finally {
      setIsLoading(false);
    }
  }, [expenseId, user?.id, router]);

  // Initial fetch
  useEffect(() => {
    fetchExpense();
  }, [fetchExpense]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchExpense();
    }, [fetchExpense])
  );

  if (!expenseId) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-xl text-gray-600">No expense selected</Text>
        <Text className="text-gray-500 mt-2">Select an expense to view its details</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (!expense) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-600">Expense not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Expense Details</Text>
        
        <Card className="mb-6 shadow-sm">
          <Card.Content className="p-4">
            <View className="mb-4">
              <Text className="text-3xl font-bold text-gray-800 mb-2">{expense.name}</Text>
              <Text className="text-2xl font-semibold text-green-600">${expense.amount}</Text>
            </View>

            <Divider className="my-4" />

            <View className="space-y-4">
              <View>
                <Text className="text-sm text-gray-500 mb-1">Category</Text>
                <Text className="text-lg text-gray-800">{expense.category}</Text>
              </View>

              <View>
                <Text className="text-sm text-gray-500 mb-1">Description</Text>
                <Text className="text-lg text-gray-800">{expense.description}</Text>
              </View>

              <View>
                <Text className="text-sm text-gray-500 mb-1">Date</Text>
                <Text className="text-lg text-gray-800">
                  {new Date(expense.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Button 
          mode="outlined" 
          onPress={() => router.back()}
          className="mt-4"
          contentStyle={{ paddingVertical: 8 }}
        >
          Back to Expenses
        </Button>
      </View>
    </ScrollView>
  );
}