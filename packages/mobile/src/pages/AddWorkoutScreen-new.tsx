import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index';
import { useWorkouts } from '../shared/hooks';
import type { WorkoutFormData } from '@workout-interval/shared';

type Props = NativeStackScreenProps<RootStackParamList, 'AddWorkout'>;

export const AddWorkoutScreen = ({ navigation }: Props) => {
  const { addWorkout } = useWorkouts();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<WorkoutFormData>({
    title: '',
    workTime: '00:45',
    restTime: '00:15',
    exercises: 10,
    sets: 3,
    breakTime: '01:00',
  });

  const handleInputChange = (
    field: keyof WorkoutFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Basic validation
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a workout title');
      return;
    }

    if (formData.exercises <= 0 || formData.sets <= 0) {
      Alert.alert('Error', 'Exercises and sets must be greater than 0');
      return;
    }

    setLoading(true);
    try {
      const newId = await addWorkout(formData);
      if (newId) {
        Alert.alert('Success', 'Workout created successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', 'Failed to create workout');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1 p-5">
        <Text className="text-2xl font-bold mb-6 text-gray-800">
          Create New Workout
        </Text>

        {/* Title */}
        <View className="mb-4">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Title
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="Enter workout title"
            value={formData.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />
        </View>

        {/* Work Time */}
        <View className="mb-4">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Work Time (mm:ss)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="00:45"
            value={formData.workTime}
            onChangeText={(text) => handleInputChange('workTime', text)}
          />
        </View>

        {/* Rest Time */}
        <View className="mb-4">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Rest Time (mm:ss)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="00:15"
            value={formData.restTime}
            onChangeText={(text) => handleInputChange('restTime', text)}
          />
        </View>

        {/* Exercises */}
        <View className="mb-4">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Number of Exercises
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="10"
            keyboardType="numeric"
            value={formData.exercises.toString()}
            onChangeText={(text) =>
              handleInputChange('exercises', parseInt(text) || 0)
            }
          />
        </View>

        {/* Sets */}
        <View className="mb-4">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Number of Sets
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="3"
            keyboardType="numeric"
            value={formData.sets.toString()}
            onChangeText={(text) =>
              handleInputChange('sets', parseInt(text) || 0)
            }
          />
        </View>

        {/* Break Time */}
        <View className="mb-6">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Break Time (mm:ss)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="01:00"
            value={formData.breakTime}
            onChangeText={(text) => handleInputChange('breakTime', text)}
          />
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            className="flex-1 bg-gray-300 py-3 rounded-lg"
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text className="text-center text-base font-semibold text-gray-700">
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ${
              loading ? 'bg-blue-300' : 'bg-blue-500'
            }`}
            onPress={handleSave}
            disabled={loading}
          >
            <Text className="text-center text-base font-semibold text-white">
              {loading ? 'Saving...' : 'Save Workout'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
