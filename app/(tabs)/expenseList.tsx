import { Expense, getExpenses } from '@/services/expenseServices';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { Card, Searchbar } from 'react-native-paper';

export default function RoutesList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const fetchedExpenses = await getExpenses();
      setExpenses(fetchedExpenses);
    } catch (error) {
      const err = error as Error;
      Alert.alert('Error', err.message || 'Failed to fetch expenses');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [])
  );

  const handleExpenseSelect = (expense: Expense) => {
    router.push({
      pathname: '/(tabs)/details',
      params: { expenseId: expense.id }
    });
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (expense.amount?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <Pressable onPress={() => handleExpenseSelect(item)}>
      <Card className="m-2 bg-white shadow-sm">
        <Card.Content className="p-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-800 mb-1">{item.name}</Text>
              <View className="flex-row items-center mb-2">
                <Text className="text-lg font-semibold text-green-600">${item.amount}</Text>
                <Text className="text-sm text-gray-500 ml-2">•</Text>
                <Text className="text-sm text-gray-500 ml-2">{item.category}</Text>
              </View>
              <Text className="text-sm text-gray-600">{item.description}</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-full">
              <Text className="text-xs text-gray-600">
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4 bg-white shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Expenses</Text>
        <Searchbar
          placeholder="Search expenses..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="bg-gray-100"
          iconColor="#6B7280"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      <FlatList
        data={filteredExpenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{ padding: 8 }}
        refreshing={isLoading}
        onRefresh={fetchExpenses}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-gray-500 text-center">
              {searchQuery ? 'No expenses found matching your search' : 'No expenses found'}
            </Text>
          </View>
        }
      />
    </View>
  );
}