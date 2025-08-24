import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index';
import { useWorkouts } from '../shared/hooks';
import type { Workout } from '@workout-interval/shared';

type Props = NativeStackScreenProps<RootStackParamList, 'Workouts'>;

export const WorkoutsScreen = ({ navigation }: Props) => {
  const { workouts, loading, error, refresh } = useWorkouts();

  // Refresh workouts when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [refresh])
  );

  const renderWorkout = ({ item }: { item: Workout }) => (
    <TouchableOpacity
      className="bg-white p-5 mb-4 rounded-2xl border border-gray-100 shadow-sm"
      onPress={() => navigation.navigate('Workout', { workout: item })}
    >
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xl font-bold text-gray-900 flex-1">
          {item.title}
        </Text>
        <View className="bg-blue-100 px-3 py-1 rounded-full">
          <Text className="text-blue-800 text-sm font-medium">
            {item.sets} sets
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <View className="w-3 h-3 bg-green-500 rounded-full mr-2" />
          <Text className="text-sm font-medium text-gray-600">Work: </Text>
          <Text className="text-sm font-bold text-green-600">
            {item.workTime}
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 bg-orange-500 rounded-full mr-2" />
          <Text className="text-sm font-medium text-gray-600">Rest: </Text>
          <Text className="text-sm font-bold text-orange-600">
            {item.restTime}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center">
        <View className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
        <Text className="text-sm font-medium text-gray-600">
          {item.exercises} exercises
        </Text>
        <Text className="text-sm text-gray-400 ml-2">
          • Break: {item.breakTime}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <View className="bg-white p-8 rounded-2xl shadow-sm">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-lg font-medium text-gray-700 mt-4 text-center">
            Loading workouts...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <View className="bg-white p-8 rounded-2xl shadow-sm max-w-xs">
          <View className="w-20 h-20 bg-red-100 rounded-full justify-center items-center mx-auto mb-6">
            <Text className="text-3xl">⚠️</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-3 text-center">
            Oops!
          </Text>
          <Text className="text-base text-gray-500 text-center mb-8">
            {error}
          </Text>
          <TouchableOpacity
            className="bg-blue-500 px-8 py-4 rounded-xl shadow-sm"
            onPress={() => navigation.navigate('AddWorkout')}
          >
            <Text className="text-white text-lg font-bold text-center">
              Create First Workout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-5 pt-12 pb-6 shadow-sm">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-3xl font-bold text-gray-900 mb-1">
              My Workouts
            </Text>
            <Text className="text-base text-gray-500">
              {workouts.length} workout{workouts.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-blue-500 px-5 py-3 rounded-xl shadow-sm"
            onPress={() => navigation.navigate('AddWorkout')}
          >
            <Text className="text-white text-base font-semibold">+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 px-5 pt-4">
        {workouts.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <View className="bg-white p-8 rounded-2xl shadow-sm max-w-xs">
              <View className="w-20 h-20 bg-blue-100 rounded-full justify-center items-center mx-auto mb-6">
                <Text className="text-3xl">🏋️‍♂️</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800 mb-3 text-center">
                Ready to Start?
              </Text>
              <Text className="text-base text-gray-500 text-center mb-8 leading-6">
                Create your first workout and begin your fitness journey!
              </Text>
              <TouchableOpacity
                className="bg-blue-500 px-8 py-4 rounded-xl shadow-sm"
                onPress={() => navigation.navigate('AddWorkout')}
              >
                <Text className="text-white text-lg font-bold text-center">
                  Create First Workout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <FlatList
            data={workouts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderWorkout}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
};
