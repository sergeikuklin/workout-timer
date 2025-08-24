import type { Workout } from '@workout-interval/shared';
import {
  createWorkoutTimerMachine,
  timeStringToSeconds,
} from '@workout-interval/shared';
import { useMachine } from '@xstate/react';
import { FC, useMemo } from 'react';
import { PauseIcon, PlayIcon, Button, CircularProgress } from 'shared/ui';
import {
  initSounds,
  playSecondSound,
  playLastSecondSound,
  playCompleteSound,
} from './utils/sound';

type WorkoutTimerProps = {
  workout: Workout;
};

export const WorkoutTimer: FC<WorkoutTimerProps> = ({ workout }) => {
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

  return (
    <div 
      className={`text-center flex justify-center items-center flex-col transition-all duration-500 min-h-screen ${
        getTimerVariant() === 'work' ? 'bg-red-50/30' :
        getTimerVariant() === 'rest' ? 'bg-green-50/30' :
        getTimerVariant() === 'break' ? 'bg-blue-50/30' :
        getTimerVariant() === 'done' ? 'bg-purple-50/30' :
        'bg-background'
      }`}
    >
      <div className="flex flex-col items-center">
        <CircularProgress
          value={progressValue}
          variant={getTimerVariant()}
          size="22rem"
          strokeWidth="12px"
          className="mb-8"
        >
          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mb-2 font-medium">
              Exercise {currentExercise} of {workout.exercises}
            </p>
            <div className={`font-mono font-bold transition-all duration-200 ${
              getTimerVariant() === 'work' ? 'text-7xl text-red-600' :
              getTimerVariant() === 'rest' ? 'text-7xl text-green-600' :
              getTimerVariant() === 'break' ? 'text-7xl text-blue-600' :
              getTimerVariant() === 'done' ? 'text-7xl text-purple-600' :
              'text-6xl'
            }`}>
              {`${Math.floor(timeLeft / 60)}`.padStart(2, '0')}:
              {`${timeLeft % 60}`.padStart(2, '0')}
            </div>
            <p className={`text-xl font-bold mt-3 capitalize tracking-wider ${
              getTimerVariant() === 'work' ? 'text-red-700' :
              getTimerVariant() === 'rest' ? 'text-green-700' :
              getTimerVariant() === 'break' ? 'text-blue-700' :
              getTimerVariant() === 'done' ? 'text-purple-700' :
              'text-foreground'
            }`}>
              {stateValue}
            </p>
          </div>
        </CircularProgress>
        
        <div className="bg-card rounded-lg p-4 shadow-sm border mb-6">
          <p className="text-lg font-medium">
            Set {currentSet} of {workout.sets}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div>
            {state.matches('idle') && (
              <Button
                onClick={startWorkout}
                size="lg"
                className="h-16 w-16 rounded-full text-xl shadow-lg hover:shadow-xl transition-all"
              >
                <PlayIcon />
              </Button>
            )}

            {isRunning && (
              <Button
                onClick={() => send({ type: 'PAUSE' })}
                size="lg"
                variant="destructive"
                className="h-16 w-16 rounded-full text-xl shadow-lg hover:shadow-xl transition-all"
              >
                <PauseIcon />
              </Button>
            )}

            {isPaused && (
              <Button
                onClick={() => send({ type: 'RESUME' })}
                size="lg"
                className="h-16 w-16 rounded-full text-xl shadow-lg hover:shadow-xl transition-all"
              >
                <PlayIcon />
              </Button>
            )}
          </div>

          {state.matches('done') && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-purple-600 mb-2">🎉 Workout Complete!</h2>
              <p className="text-lg text-muted-foreground">Great job! You've finished your workout.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
