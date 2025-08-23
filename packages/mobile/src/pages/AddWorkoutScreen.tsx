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
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [restTime, setRestTime] = useState('');

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }

    const parsedSets = parseInt(sets);
    const parsedWorkTime = parseInt(workTime);
    const parsedRestTime = parseInt(restTime);

    if (!parsedSets || parsedSets <= 0) {
      Alert.alert('Error', 'Please enter valid number of sets');
      return;
    }

    if (!parsedWorkTime || parsedWorkTime <= 0) {
      Alert.alert('Error', 'Please enter valid work time');
      return;
    }

    if (!parsedRestTime || parsedRestTime < 0) {
      Alert.alert('Error', 'Please enter valid rest time');
      return;
    }

    try {
      await addWorkout({
        title: name.trim(),
        workTime: workTime,
        restTime: restTime,
        exercises: parsedSets,
        sets: parsedSets,
        breakTime: '0',
      });

      Alert.alert('Success', 'Workout saved successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save workout');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
              className="border border-slate-300 rounded-lg px-4 py-3 text-lg bg-white"
              value={sets}
              onChangeText={setSets}
              placeholder="e.g., 5"
              keyboardType="numeric"
              placeholderTextColor="#64748b"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold text-slate-800 mb-2">
              Work Time (seconds)
            </Text>
            <TextInput
              className="border border-orange-400 rounded-lg px-4 py-3 text-lg bg-orange-50"
              value={workTime}
              onChangeText={setWorkTime}
              placeholder="e.g., 30"
              keyboardType="numeric"
              placeholderTextColor="#ea580c"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold text-slate-800 mb-2">
              Rest Time (seconds)
            </Text>
            <TextInput
              className="border border-blue-400 rounded-lg px-4 py-3 text-lg bg-blue-50"
              value={restTime}
              onChangeText={setRestTime}
              placeholder="e.g., 10"
              keyboardType="numeric"
              placeholderTextColor="#2563eb"
            />
          </View>

          <TouchableOpacity
            className="bg-green-600 rounded-lg py-4 mt-8"
            onPress={handleSave}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Save Workout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
