import { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useMachine } from '@xstate/react';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import type { Workout } from '@workout-interval/shared';
import {
  createWorkoutTimerMachine,
  timeStringToSeconds,
} from '@workout-interval/shared';
import {
  initSounds,
  playSecondSound,
  playLastSecondSound,
  playCompleteSound,
} from './utils/sound';

interface WorkoutTimerProps {
  workout: Workout;
  onComplete?: () => void;
  onBack?: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getTimerPhase = (state: any) => {
  if (state.matches('work')) return 'Work';
  if (state.matches('rest')) return 'Rest';
  if (state.matches('break')) return 'Break';
  if (state.matches('done')) return 'Complete!';
  return 'Ready';
};

const getPhaseColor = (state: any) => {
  if (state.matches('work')) return 'bg-green-500';
  if (state.matches('rest')) return 'bg-blue-500';
  if (state.matches('break')) return 'bg-purple-500';
  if (state.matches('done')) return 'bg-gray-500';
  return 'bg-gray-400';
};

export const WorkoutTimer = ({
  workout,
  onComplete,
  onBack,
}: WorkoutTimerProps) => {
  const workoutTimerMachine = useMemo(() => {
    return createWorkoutTimerMachine({
      playSecondSound,
      playLastSecondSound,
      playCompleteSound,
    });
  }, []);

  const [state, send] = useMachine(workoutTimerMachine, {
    input: {
      workTime: timeStringToSeconds(workout.workTime),
      restTime: timeStringToSeconds(workout.restTime),
      breakTime: timeStringToSeconds(workout.breakTime),
      exercises: workout.exercises,
      sets: workout.sets,
    },
  });

  useEffect(() => {
    // Keep screen awake during workout
    activateKeepAwakeAsync();

    return () => {
      deactivateKeepAwake();
    };
  }, []);

  useEffect(() => {
    // Call onComplete when workout is done
    if (state.matches('done') && onComplete) {
      onComplete();
    }
  }, [state, onComplete]);

  const startWorkout = () => {
    initSounds();
    send({ type: 'START' });
  };

  const handlePause = () => {
    send({ type: 'PAUSE' });
  };

  const handleResume = () => {
    send({ type: 'RESUME' });
  };

  const isRunning =
    state.matches({ work: 'running' }) ||
    state.matches({ rest: 'running' }) ||
    state.matches({ break: 'running' });

  const isPaused =
    state.matches({ work: 'paused' }) ||
    state.matches({ rest: 'paused' }) ||
    state.matches({ break: 'paused' });

  const progress =
    state.context.time > 0
      ? ((state.context.time - state.context.timeLeft) / state.context.time) *
        100
      : 0;

  return (
    <View className="flex-1 bg-gray-50 p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-8">
        <TouchableOpacity onPress={onBack} className="p-2 -ml-2">
          <Text className="text-blue-500 text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800">
          {workout.title}
        </Text>
        <View className="w-12" />
      </View>

      {/* Timer Circle */}
      <View className="items-center mb-12">
        <View className="relative w-80 h-80 items-center justify-center">
          {/* Progress Circle Background */}
          <View className="absolute inset-0 rounded-full border-8 border-gray-200" />

          {/* Progress Circle */}
          <View
            className={`absolute inset-0 rounded-full border-8 ${getPhaseColor(state)}`}
            style={{
              transform: [{ rotate: `${progress * 3.6 - 90}deg` }],
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
            }}
          />

          {/* Timer Content */}
          <View className="items-center">
            <Text className="text-6xl font-bold text-gray-800 mb-2">
              {formatTime(state.context.timeLeft)}
            </Text>
            <Text
              className={`text-2xl font-semibold mb-4 ${
                state.matches('work')
                  ? 'text-green-600'
                  : state.matches('rest')
                    ? 'text-blue-600'
                    : state.matches('break')
                      ? 'text-purple-600'
                      : 'text-gray-600'
              }`}
            >
              {getTimerPhase(state)}
            </Text>
            <Text className="text-lg text-gray-600">
              Exercise {state.context.currentExercise} of{' '}
              {state.context.exercises}
            </Text>
            <Text className="text-lg text-gray-600">
              Set {state.context.currentSet} of {state.context.sets}
            </Text>
          </View>
        </View>
      </View>

      {/* Control Buttons */}
      <View className="flex-row justify-center space-x-6">
        {state.matches('idle') && (
          <TouchableOpacity
            onPress={startWorkout}
            className="bg-green-500 px-8 py-4 rounded-full"
          >
            <Text className="text-white text-xl font-semibold">Start</Text>
          </TouchableOpacity>
        )}

        {isRunning && (
          <TouchableOpacity
            onPress={handlePause}
            className="bg-orange-500 px-8 py-4 rounded-full"
          >
            <Text className="text-white text-xl font-semibold">Pause</Text>
          </TouchableOpacity>
        )}

        {isPaused && (
          <TouchableOpacity
            onPress={handleResume}
            className="bg-green-500 px-8 py-4 rounded-full"
          >
            <Text className="text-white text-xl font-semibold">Resume</Text>
          </TouchableOpacity>
        )}

        {state.matches('done') && (
          <TouchableOpacity
            onPress={onBack}
            className="bg-blue-500 px-8 py-4 rounded-full"
          >
            <Text className="text-white text-xl font-semibold">Finish</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Workout Info */}
      <View className="mt-8 bg-white p-4 rounded-lg shadow-sm">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Work Time</Text>
          <Text className="font-semibold">{workout.workTime}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Rest Time</Text>
          <Text className="font-semibold">{workout.restTime}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Break Time</Text>
          <Text className="font-semibold">{workout.breakTime}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Exercises</Text>
          <Text className="font-semibold">{workout.exercises}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Sets</Text>
          <Text className="font-semibold">{workout.sets}</Text>
        </View>
      </View>
    </View>
  );
};
