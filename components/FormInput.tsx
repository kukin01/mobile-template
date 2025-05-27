import React from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface FormInputProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: RegisterOptions<T>;
  secureTextEntry?: boolean;
  containerClassName?: string;
  [key: string]: any;
}

export const FormInput = <T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  rules = {},
  secureTextEntry = false,
  containerClassName,
  ...props
}: FormInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <View className={containerClassName ?? "bg-gray-700 rounded-lg mb-2 w-1/2"}>
            <TextInput
              mode="outlined"
              label={label}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!error}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
          {error && (
            <Text style={{ color: 'red', marginTop: 4 }}>
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
};