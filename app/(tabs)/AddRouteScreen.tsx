import { FormInput } from '@/components/FormInput';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-paper';

interface AddRouteForm {
  name: string;
  busNumber: string;
  description: string;
}

export default function AddRouteScreen() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<AddRouteForm>({
    defaultValues: {
      name: '',
      busNumber: '',
      description: ''
    },
    mode: 'onChange'
  });

  const onSubmit = (data: AddRouteForm) => {
    // Here you would typically make an API call to create the route
    console.log('New route data:', data);
    router.back(); // Navigate back to the routes list
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <FormInput
          control={control}
          name="name"
          label="Route Name"
          placeholder="Enter route name"
          containerClassName="mb-4"
          error={errors.name?.message}
          rules={{
            required: 'Route name is required',
            minLength: {
              value: 3,
              message: 'Route name must be at least 3 characters'
            }
          }}
        />

        <FormInput
          control={control}
          name="busNumber"
          label="Bus Number"
          placeholder="Enter bus number"
          containerClassName="mb-4"
          error={errors.busNumber?.message}
          rules={{
            required: 'Bus number is required',
            pattern: {
              value: /^[A-Za-z0-9-]+$/,
              message: 'Bus number can only contain letters, numbers, and hyphens'
            }
          }}
        />

        <FormInput
          control={control}
          name="description"
          label="Description"
          placeholder="Enter route description"
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

        <View className="flex-row justify-end space-x-2">
          <Button mode="outlined" onPress={() => router.back()}>
            Cancel
          </Button>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Add Route
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}