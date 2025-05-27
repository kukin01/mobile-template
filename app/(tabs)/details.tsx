import { Expense } from '@/types/expenses';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

const API_URL = 'https://67ac71475853dfff53dab929.mockapi.io/api/v1/expenses';

export default function RouteDetailScreen() {
  const { expenseId } = useLocalSearchParams();
  const router = useRouter();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(`${API_URL}/${expenseId}`);
        if (response.data) {
          setExpense(response.data);
        } else {
          // If expense not found (was deleted), navigate back
          router.replace('/(tabs)/ownerExpenses');
        }
      } catch (error) {
        // If there's an error (like 404 for deleted item), navigate back
        router.replace('/(tabs)/ownerExpenses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpense();
  }, [expenseId]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!expense) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Expense not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Card className="mb-4">
          <Card.Content>
            <Text className="text-2xl font-bold">{expense.name}</Text>
            <Text className="text-xl text-gray-600">Amount ${expense.amount}</Text>
            <Text className="text-gray-500 mt-2">{expense.description}</Text>
            <Text className="text-gray-500 mt-2">{expense.category}</Text>
            <Text className="text-gray-500 mt-2">{expense.date}</Text>
          </Card.Content>
        </Card>

        <Button 
          mode="outlined" 
          onPress={() => router.back()}
          className="mt-4"
        >
          Back to Expenses
        </Button>
      </View>
    </ScrollView>
  );
}