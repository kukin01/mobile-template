import { useAuth } from '@/hooks/useAuth';
import { deleteExpense, getExpenses } from '@/services/expenseServices';
import { Expense } from '@/types/expenses';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { Card, IconButton, Searchbar } from 'react-native-paper';

export default function OwnerExpensesScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchOwnerExpenses();
  }, []);

  const fetchOwnerExpenses = async () => {
    try {
      setIsLoading(true);
      const allExpenses = await getExpenses();
      // Filter expenses to show only the current user's expenses by matching userId
      const ownerExpenses = allExpenses.filter(expense => 
        expense.userId === user?.id
      );
      setExpenses(ownerExpenses);
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

  const handleDelete = async (expenseId: string) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExpense(expenseId);
              // Remove the deleted expense from the local state
              setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== expenseId));
              // Navigate back to owner expenses screen
              router.replace('/(tabs)/ownerExpenses');
            } catch (error) {
              const err = error as Error;
              Alert.alert('Error', err.message || 'Failed to delete expense');
            }
          },
        },
      ]
    );
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
            <IconButton
              icon="delete"
              iconColor="red"
              size={24}
              onPress={() => handleDelete(item.id)}
            />
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        <Searchbar
          placeholder="Search your expenses..."
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
        onRefresh={fetchOwnerExpenses}
      />
    </View>
  );
}
