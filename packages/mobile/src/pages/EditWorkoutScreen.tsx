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

type Props = NativeStackScreenProps<RootStackParamList, 'EditWorkout'>;

export const EditWorkoutScreen = ({ navigation, route }: Props) => {
  const { workout } = route.params;
  const { updateWorkout } = useWorkouts();

  // Initialize state with existing workout data
  const [name, setName] = useState(workout.title);
  const [sets, setSets] = useState(workout.sets.toString());
  const [exercises, setExercises] = useState(workout.exercises.toString());
  const [workTime, setWorkTime] = useState(workout.workTime);
  const [restTime, setRestTime] = useState(workout.restTime);
  const [breakTime, setBreakTime] = useState(workout.breakTime);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }

    const parsedSets = parseInt(sets);
    const parsedExercises = parseInt(exercises);

    if (!parsedSets || parsedSets <= 0) {
      Alert.alert('Error', 'Please enter valid number of sets');
      return;
    }

    if (!parsedExercises || parsedExercises <= 0) {
      Alert.alert('Error', 'Please enter valid number of exercises');
      return;
    }

    if (!workTime.trim()) {
      Alert.alert('Error', 'Please enter work time');
      return;
    }

    if (!restTime.trim()) {
      Alert.alert('Error', 'Please enter rest time');
      return;
    }

    try {
      await updateWorkout({
        ...workout,
        title: name.trim(),
        sets: parsedSets,
        exercises: parsedExercises,
        workTime: workTime.trim(),
        restTime: restTime.trim(),
        breakTime: breakTime.trim(),
      });

      Alert.alert('Success', 'Workout updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update workout');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="bg-white px-5 pt-12 pb-6 shadow-sm">
        <Text className="text-3xl font-bold text-gray-900 mb-1">
          Edit Workout
        </Text>
        <Text className="text-base text-gray-500">
          Modify "{workout.title}"
        </Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <View className="space-y-6">
          <View>
            <Text className="text-lg font-semibold text-slate-800 mb-2">
              Workout Name
            </Text>
            <TextInput
              className="border border-slate-300 rounded-lg px-4 py-3 text-lg bg-white"
              value={name}
              onChangeText={setName}
              placeholder="Enter workout name"
              placeholderTextColor="#64748b"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold text-slate-800 mb-2">
              Number of Sets
            </Text>
            <TextInput
              className="border border-indigo-400 rounded-lg px-4 py-3 text-lg bg-indigo-50"
              value={sets}
              onChangeText={setSets}
              placeholder="e.g., 3"
              keyboardType="numeric"
              placeholderTextColor="#4338ca"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold text-slate-800 mb-2">
              Number of Exercises
            </Text>
            <TextInput
              className="border border-blue-400 rounded-lg px-4 py-3 text-lg bg-blue-50"
              value={exercises}
              onChangeText={setExercises}
              placeholder="e.g., 8"
              keyboardType="numeric"
              placeholderTextColor="#2563eb"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold text-slate-800 mb-2">
              Work Time
            </Text>
            <TextInput
              className="border border-green-400 rounded-lg px-4 py-3 text-lg bg-green-50"
              value={workTime}
              onChangeText={setWorkTime}
              placeholder="e.g., 45s or 00:45"
              placeholderTextColor="#15803d"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold text-slate-800 mb-2">
              Rest Time
            </Text>
            <TextInput
              className="border border-orange-400 rounded-lg px-4 py-3 text-lg bg-orange-50"
              value={restTime}
              onChangeText={setRestTime}
              placeholder="e.g., 15s or 00:15"
              placeholderTextColor="#ea580c"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold text-slate-800 mb-2">
              Break Time (between sets)
            </Text>
            <TextInput
              className="border border-purple-400 rounded-lg px-4 py-3 text-lg bg-purple-50"
              value={breakTime}
              onChangeText={setBreakTime}
              placeholder="e.g., 60s or 01:00"
              placeholderTextColor="#7c3aed"
            />
          </View>

          <View className="flex-row space-x-4">
            <TouchableOpacity
              className="flex-1 bg-blue-600 rounded-lg py-4 mt-8"
              onPress={handleSave}
            >
              <Text className="text-white text-lg font-semibold text-center">
                Save Changes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-gray-400 rounded-lg py-4 mt-8"
              onPress={() => navigation.goBack()}
            >
              <Text className="text-white text-lg font-semibold text-center">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
