import { getExpenses } from '@/services/expenseServices';
import { Expense } from '@/types/expenses';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { Card, Searchbar } from 'react-native-paper';

export default function RoutesList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchExpenses();
  }, []);

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
  
  const handleExpenseSelect = (expense: Expense) => {
    router.push({
      pathname: '/(tabs)/details',
      params: { expenseId: expense.id }
    });
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.amount.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <Pressable onPress={() => handleExpenseSelect(item)}>
      <Card className="m-2 p-4 bg-white">
        <Card.Content>
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-gray-600">${item.amount}</Text>
              <Text className="text-gray-600">{item.category}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        <Searchbar
          placeholder="Search expenses..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="bg-white"
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
      />
    </View>
  );
}