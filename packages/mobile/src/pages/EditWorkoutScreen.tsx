import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index';
import { EditWorkout } from '../features';

type Props = NativeStackScreenProps<RootStackParamList, 'EditWorkout'>;

export const EditWorkoutScreen = ({ navigation, route }: Props) => {
  const { workout } = route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <EditWorkout workout={workout} />
    </KeyboardAvoidingView>
  );
};
