import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index';
import { WorkoutTimer } from '../features/WorkoutTimer/WorkoutTimer';

type Props = NativeStackScreenProps<RootStackParamList, 'Workout'>;

export const WorkoutScreen = ({ navigation, route }: Props) => {
  const { workout } = route.params;

  const handleComplete = () => {
    navigation.goBack();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <WorkoutTimer
      workout={workout}
      onComplete={handleComplete}
      onBack={handleBack}
    />
  );
};
