import { useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useMachine } from '@xstate/react';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import type { Workout } from '@workout-interval/shared';
import {
  createWorkoutTimerMachine,
  timeStringToSeconds,
} from '@workout-interval/shared';
import {
  ShadcnButton,
  CircularProgress,
  Card,
  CardContent,
  PlayIcon,
  PauseIcon,
} from '../../shared/ui';
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

  const { context, value } = state;
  const { timeLeft, time, currentExercise, currentSet } = context;

  const isRunning =
    state.matches({
      work: 'running',
    }) ||
    state.matches({
      rest: 'running',
    }) ||
    state.matches({ break: 'running' });

  const isPaused =
    state.matches({ work: 'paused' }) ||
    state.matches({ rest: 'paused' }) ||
    state.matches({ break: 'paused' });

  const stateValue =
    typeof value === 'object' ? Object.keys(value).join() : value;

  const progressValue = 100 - (timeLeft / time) * 100 || 0;

  // Get the current variant for styling
  const getTimerVariant = (): 'work' | 'rest' | 'break' | 'idle' | 'done' => {
    if (state.matches('done')) return 'done';
    if (state.matches('work')) return 'work';
    if (state.matches('rest')) return 'rest';
    if (state.matches('break')) return 'break';
    return 'idle';
  };

  const getTextColorClass = () => {
    switch (getTimerVariant()) {
      case 'work':
        return 'text-red-600';
      case 'rest':
        return 'text-green-600';
      case 'break':
        return 'text-blue-600';
      case 'done':
        return 'text-purple-600';
      default:
        return 'text-foreground';
    }
  };

  const getBgColorClass = () => {
    switch (getTimerVariant()) {
      case 'work':
        return 'bg-red-50/30';
      case 'rest':
        return 'bg-green-50/30';
      case 'break':
        return 'bg-blue-50/30';
      case 'done':
        return 'bg-purple-50/30';
      default:
        return 'bg-background';
    }
  };

  return (
    <View
      className={`flex-1 items-center justify-center px-4 ${getBgColorClass()}`}
    >
      <View className="flex flex-col items-center">
        <CircularProgress
          value={progressValue}
          variant={getTimerVariant()}
          size={350}
          strokeWidth={24}
          className="mb-8"
        >
          <View className="flex flex-col items-center">
            <Text className="text-sm text-muted-foreground mb-2 font-medium">
              Exercise {currentExercise} of {workout.exercises}
            </Text>
            <Text
              className={`font-mono font-bold text-7xl ${getTextColorClass()}`}
            >
              {`${Math.floor(timeLeft / 60)}`.padStart(2, '0')}:
              {`${timeLeft % 60}`.padStart(2, '0')}
            </Text>
            <Text
              className={`text-xl font-bold mt-3 capitalize tracking-wider ${getTextColorClass()}`}
            >
              {stateValue}
            </Text>
          </View>
        </CircularProgress>

        <Card className="mb-6 shadow-sm">
          <CardContent className="p-4">
            <Text className="text-lg font-medium text-center">
              Set {currentSet} of {workout.sets}
            </Text>
          </CardContent>
        </Card>

        <View className="flex flex-col items-center gap-6">
          <View>
            {state.matches('idle') && (
              <ShadcnButton
                onPress={startWorkout}
                size="lg"
                className="h-16 w-16 rounded-full"
              >
                <PlayIcon />
              </ShadcnButton>
            )}

            {isRunning && (
              <ShadcnButton
                onPress={() => send({ type: 'PAUSE' })}
                size="lg"
                variant="destructive"
                className="h-16 w-16 rounded-full"
              >
                <PauseIcon />
              </ShadcnButton>
            )}

            {isPaused && (
              <ShadcnButton
                onPress={() => send({ type: 'RESUME' })}
                size="lg"
                className="h-16 w-16 rounded-full"
              >
                <PlayIcon />
              </ShadcnButton>
            )}
          </View>

          {state.matches('done') && (
            <View className="text-center">
              <Text className="text-3xl font-bold text-purple-600 mb-2">
                🎉 Workout Complete!
              </Text>
              <Text className="text-lg text-muted-foreground">
                Great job! You've finished your workout.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
