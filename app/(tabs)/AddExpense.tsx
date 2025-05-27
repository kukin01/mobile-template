import { FormInput } from '@/components/FormInput';
import { useAuth } from '@/hooks/useAuth';
import { addExpense, Expense } from '@/services/expenseServices';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

interface AddExpenseForm {
  name: string;
  amount: number;
  description: string;
  category: string;
}

export default function AddRouteScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<AddExpenseForm>({
    defaultValues: {
      name: '',
      amount: 0,
      description: '',
      category: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (data: AddExpenseForm) => {
    try {
      setIsSubmitting(true);
      const expenseData: Expense = {
        ...data,
        id: '',
        userId: user?.id,
        date: new Date().toISOString(),
      };
      
      await addExpense(expenseData);
      Alert.alert('Success', 'Expense added successfully');
      router.replace('/(tabs)/expenseList');
    } catch (error) {
      const err = error as Error;
      Alert.alert('Error', err.message || 'Failed to add expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Add New Expense</Text>
        
        <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <FormInput
            control={control}
            name="name"
            label="Expense name"
            placeholder="Enter expense name"
            containerClassName="mb-4"
            error={errors.name?.message}
            rules={{
              required: 'Expense name is required',
              minLength: {
                value: 3,
                message: 'Expense name must be at least 3 characters'
              }
            }}
          />

          <FormInput
            control={control}
            name="amount"
            label="Amount"
            placeholder="Enter amount"
            containerClassName="mb-4"
            error={errors.amount?.message}
            keyboardType="numeric"
            rules={{
              required: 'Amount is required',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Amount can only contain numbers'
              }
            }}
          />

          <FormInput
            control={control}
            name="category"
            label="Category"
            placeholder="Enter category"
            containerClassName="mb-4"
            error={errors.category?.message}
            rules={{
              required: 'Category is required',
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'Category can only contain letters'
              }
            }}
          />

          <FormInput
            control={control}
            name="description"
            label="Description"
            placeholder="Enter expense description"
            containerClassName="mb-4"
            error={errors.description?.message}
            multiline
            numberOfLines={3}
            rules={{
              required: 'Description is required',
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters'
              }
            }}
          />
        </View>

        <View className="flex-row justify-end space-x-3 mt-4">
          <Button 
            mode="outlined" 
            onPress={() => router.replace('/(tabs)/expenseList')}
            className="px-4"
          >
            Cancel
          </Button>
          <Button 
            mode="contained" 
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}
            className="px-4"
          >
            Add Expense
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}