import React, { forwardRef } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

type InputFieldProps = TextInputProps & {
  label: string;
  error?: string;
  colorScheme?: 'default' | 'green' | 'orange' | 'blue' | 'indigo' | 'purple';
};

export const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ label, error, colorScheme = 'default', ...inputProps }, ref) => {
    const getColorClasses = () => {
      switch (colorScheme) {
        case 'green':
          return 'border-green-400 bg-green-50';
        case 'orange':
          return 'border-orange-400 bg-orange-50';
        case 'blue':
          return 'border-blue-400 bg-blue-50';
        case 'indigo':
          return 'border-indigo-400 bg-indigo-50';
        case 'purple':
          return 'border-purple-400 bg-purple-50';
        default:
          return 'border-slate-300 bg-white';
      }
    };

    const getPlaceholderColor = () => {
      switch (colorScheme) {
        case 'green':
          return '#15803d';
        case 'orange':
          return '#ea580c';
        case 'blue':
          return '#2563eb';
        case 'indigo':
          return '#4338ca';
        case 'purple':
          return '#7c3aed';
        default:
          return '#64748b';
      }
    };

    return (
      <View className="mb-4">
        <Text className="text-lg font-semibold text-slate-800 mb-2">
          {label}
        </Text>
        <TextInput
          ref={ref}
          className={`border rounded-lg px-4 py-3 text-lg ${getColorClasses()}`}
          placeholderTextColor={getPlaceholderColor()}
          {...inputProps}
        />
        {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
      </View>
    );
  }
);

InputField.displayName = 'InputField';
