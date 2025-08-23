import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkoutsScreen } from './WorkoutsScreen';
import { AddWorkoutScreen } from './AddWorkoutScreen';
import { EditWorkoutScreen } from './EditWorkoutScreen';
import { WorkoutScreen } from './WorkoutScreen';
import type { Workout } from '@workout-interval/shared';

export type RootStackParamList = {
  Workouts: undefined;
  AddWorkout: undefined;
  EditWorkout: { workout: Workout };
  Workout: { workout: Workout };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Workouts"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#1f2937',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Workouts"
          component={WorkoutsScreen}
          options={{ title: 'Workouts' }}
        />
        <Stack.Screen
          name="AddWorkout"
          component={AddWorkoutScreen}
          options={{ title: 'Add Workout' }}
        />
        <Stack.Screen
          name="EditWorkout"
          component={EditWorkoutScreen}
          options={{ title: 'Edit Workout' }}
        />
        <Stack.Screen
          name="Workout"
          component={WorkoutScreen}
          options={({ route }) => ({ title: route.params.workout.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
