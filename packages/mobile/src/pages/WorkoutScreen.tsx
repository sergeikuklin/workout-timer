import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index';

type Props = NativeStackScreenProps<RootStackParamList, 'Workout'>;

export const WorkoutScreen = ({ navigation, route }: Props) => {
  const { workout } = route.params;

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-5 pt-12 pb-6 shadow-sm">
        <Text className="text-3xl font-bold text-gray-900 mb-1">
          {workout.title}
        </Text>
        <Text className="text-base text-gray-500">
          Ready to start your workout?
        </Text>
      </View>

      <View className="flex-1 px-5 pt-6">
        {/* Workout Overview Card */}
        <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            📋 Workout Overview
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-4 h-4 bg-green-500 rounded-full mr-3" />
                <Text className="text-base font-medium text-gray-700">
                  Work Time
                </Text>
              </View>
              <Text className="text-base font-bold text-green-700">
                {workout.workTime}
              </Text>
            </View>

            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-4 h-4 bg-orange-500 rounded-full mr-3" />
                <Text className="text-base font-medium text-gray-700">
                  Rest Time
                </Text>
              </View>
              <Text className="text-base font-bold text-orange-700">
                {workout.restTime}
              </Text>
            </View>

            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-4 h-4 bg-purple-500 rounded-full mr-3" />
                <Text className="text-base font-medium text-gray-700">
                  Break Time
                </Text>
              </View>
              <Text className="text-base font-bold text-purple-700">
                {workout.breakTime}
              </Text>
            </View>

            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-4 h-4 bg-blue-500 rounded-full mr-3" />
                <Text className="text-base font-medium text-gray-700">
                  Exercises
                </Text>
              </View>
              <Text className="text-base font-bold text-blue-700">
                {workout.exercises}
              </Text>
            </View>

            <View className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <View className="w-4 h-4 bg-indigo-500 rounded-full mr-3" />
                <Text className="text-base font-medium text-gray-700">
                  Sets
                </Text>
              </View>
              <Text className="text-base font-bold text-indigo-700">
                {workout.sets}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-4">
          <TouchableOpacity className="bg-green-500 py-4 rounded-xl shadow-sm active:bg-green-600">
            <Text className="text-center text-xl font-bold text-white">
              🏃‍♂️ Start Workout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-500 py-4 rounded-xl shadow-sm active:bg-blue-600"
            onPress={() => navigation.navigate('EditWorkout', { workout })}
          >
            <Text className="text-center text-lg font-semibold text-white">
              ✏️ Edit Workout
            </Text>
          </TouchableOpacity>

          <View className="bg-white p-4 rounded-xl">
            <Text className="text-center text-base text-gray-500">
              Timer functionality coming soon!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
