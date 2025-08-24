import React, { useEffect, FC } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { InputField } from '../shared/ui';
import { useWorkouts } from '../shared/hooks';
import type { Workout, WorkoutFormData } from '@workout-interval/shared';
import { DEFAULT_WORKOUT } from '@workout-interval/shared';

type EditWorkoutProps = {
  workout?: Workout;
};

export const EditWorkout: FC<EditWorkoutProps> = ({ workout }) => {
  const navigation = useNavigation();
  const { addWorkout, updateWorkout } = useWorkouts();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<WorkoutFormData>({
    defaultValues: DEFAULT_WORKOUT,
  });

  useEffect(() => {
    if (!workout) {
      return;
    }
    reset(workout);
  }, [reset, workout]);

  const handleAdd = async (data: WorkoutFormData) => {
    console.log('Adding workout with data:', data);
    const id = await addWorkout(data);
    console.log('Workout added with id:', id);
    return id;
  };

  const handleEdit = async (data: WorkoutFormData) => {
    if (!workout?.id) return;
    const id = await updateWorkout({ ...data, id: workout.id });
    console.log('Workout updated:', id);
    return id;
  };

  const onSubmit = async (data: WorkoutFormData) => {
    try {
      const mutate = workout ? handleEdit : handleAdd;
      const result = await mutate(data);

      if (result) {
        const message = workout
          ? 'Workout updated successfully!'
          : 'Workout created successfully!';
        Alert.alert('Success', message, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert(
          'Error',
          `Failed to ${workout ? 'update' : 'create'} workout`
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 p-6">
      <View className="space-y-4">
        {/* Title Field */}
        <Controller
          control={control}
          name="title"
          rules={{ required: 'Please enter a workout title' }}
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Title"
              placeholder="Enter workout title"
              value={value}
              onChangeText={onChange}
              error={errors.title?.message}
              colorScheme="default"
            />
          )}
        />

        {/* Work Time Field */}
        <Controller
          control={control}
          name="workTime"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Work Time (mm:ss)"
              placeholder="00:45"
              value={value}
              onChangeText={onChange}
              colorScheme="green"
            />
          )}
        />

        {/* Rest Time Field */}
        <Controller
          control={control}
          name="restTime"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Rest Time (mm:ss)"
              placeholder="00:15"
              value={value}
              onChangeText={onChange}
              colorScheme="orange"
            />
          )}
        />

        {/* Exercises Field */}
        <Controller
          control={control}
          name="exercises"
          rules={{ min: { value: 1, message: 'Must be greater than 0' } }}
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Number of Exercises"
              placeholder="10"
              keyboardType="numeric"
              value={value.toString()}
              onChangeText={(text) => onChange(parseInt(text) || 0)}
              error={errors.exercises?.message}
              colorScheme="blue"
            />
          )}
        />

        {/* Sets Field */}
        <Controller
          control={control}
          name="sets"
          rules={{ min: { value: 1, message: 'Must be greater than 0' } }}
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Number of Sets"
              placeholder="3"
              keyboardType="numeric"
              value={value.toString()}
              onChangeText={(text) => onChange(parseInt(text) || 0)}
              error={errors.sets?.message}
              colorScheme="indigo"
            />
          )}
        />

        {/* Break Time Field */}
        <Controller
          control={control}
          name="breakTime"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Break Time (mm:ss)"
              placeholder="01:00"
              value={value}
              onChangeText={onChange}
              colorScheme="purple"
            />
          )}
        />

        {/* Submit Button */}
        <View className="mt-8">
          <TouchableOpacity
            className={`rounded-lg py-4 ${
              isSubmitting ? 'bg-blue-300' : 'bg-blue-600'
            }`}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {isSubmitting ? 'Saving...' : 'Save Workout'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
