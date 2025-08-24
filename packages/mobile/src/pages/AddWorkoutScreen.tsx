import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index';
import { EditWorkout } from '../features';

type Props = NativeStackScreenProps<RootStackParamList, 'AddWorkout'>;

export const AddWorkoutScreen = ({ navigation }: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <EditWorkout />
    </KeyboardAvoidingView>
  );
};
