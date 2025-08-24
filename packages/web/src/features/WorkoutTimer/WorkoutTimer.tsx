import type { Workout } from '@workout-interval/shared';
import {
  createWorkoutTimerMachine,
  timeStringToSeconds,
} from '@workout-interval/shared';
import { useMachine } from '@xstate/react';
import { FC, useMemo } from 'react';
import { PauseIcon, PlayIcon, Button } from 'shared/ui';
import classNames from 'classnames';
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

  const progressProps = {
    '--value': 100 - (timeLeft / time) * 100 || 0,
    '--size': '20rem',
    '--thickness': '5px',
  } as React.CSSProperties;

  return (
    <div className="text-center flex justify-center items-center flex-col ">
      <div
        className={classNames('radial-progress mt-10', {
          'text-accent': state.matches('work'),
          'text-secondary': state.matches('rest'),
        })}
        style={progressProps}
        role="progressbar"
      >
        <p>
          Exercises: {currentExercise} of {workout.exercises}
        </p>
        <div className="my-2 font-mono text-6xl">
          {`${Math.floor(timeLeft / 60)}`.padStart(2, '0')}:
          {`${timeLeft % 60}`.padStart(2, '0')}
        </div>
        <p>{stateValue}</p>
      </div>
      <p className="my-2 ">
        Sets: {currentSet} of {workout.sets}
      </p>

      <div className="mt-10">
        {state.matches('idle') && (
          <Button
            onClick={startWorkout}
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <PlayIcon />
          </Button>
        )}

        {isRunning && (
          <Button
            onClick={() => send({ type: 'PAUSE' })}
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <PauseIcon />
          </Button>
        )}

        {isPaused && (
          <Button
            onClick={() => send({ type: 'RESUME' })}
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <PlayIcon />
          </Button>
        )}
      </div>

      {state.matches('done') && <h2>Workout Complete!</h2>}
    </div>
  );
};
