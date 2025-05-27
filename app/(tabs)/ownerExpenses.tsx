import { useAuth } from '@/hooks/useAuth';
import { deleteExpense, Expense, getExpenses } from '@/services/expenseServices';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { Card, FAB, IconButton, Searchbar } from 'react-native-paper';

export default function OwnerExpensesScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
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
              // Refresh the list to ensure all views are updated
              fetchOwnerExpenses();
            } catch (error) {
              const err = error as Error;
              Alert.alert('Error', err.message || 'Failed to delete expense');
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/');
            } catch (error) {
              const err = error as Error;
              Alert.alert('Error', err.message || 'Failed to logout');
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
            <IconButton
              icon="delete"
              iconColor="red"
              size={24}
              onPress={() => handleDelete(item.id)}
              className="bg-red-50"
            />
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 bg-white shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-4">My Expenses</Text>
        <Searchbar
          placeholder="Search your expenses..."
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
        onRefresh={fetchOwnerExpenses}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-gray-500 text-center">
              {searchQuery ? 'No expenses found matching your search' : 'No expenses found'}
            </Text>
          </View>
        }
      />
      <FAB
        icon="logout"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: '#8A2BE2',
        }}
        onPress={handleLogout}
        color="white"
      />
    </View>
  );
}
