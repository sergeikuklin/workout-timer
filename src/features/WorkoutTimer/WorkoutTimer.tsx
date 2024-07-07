import { Workout } from 'shared/model';
import { workoutTimerMachine } from './utils/timerMachine';
import { useMachine } from '@xstate/react';
import { FC } from 'react';
import { PauseIcon, PlayIcon } from 'shared/ui';
import classNames from 'classnames';
import { playSecondSound } from './utils/sound';

type WorkoutTimerProps = {
  workout: Workout;
};

const timeStringToSeconds = (time: string) => {
  const [minutes, seconds] = time.split(':').map(Number);

  const totalSeconds = minutes * 60 + seconds;

  return totalSeconds;
};

export const WorkoutTimer: FC<WorkoutTimerProps> = ({ workout }) => {
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
    playSecondSound();
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
          <button onClick={startWorkout} className="btn btn-circle">
            <PlayIcon />
          </button>
        )}

        {isRunning && (
          <button
            onClick={() => send({ type: 'PAUSE' })}
            className="btn btn-circle"
          >
            <PauseIcon />
          </button>
        )}

        {isPaused && (
          <button
            onClick={() => send({ type: 'RESUME' })}
            className="btn btn-circle"
          >
            <PlayIcon />
          </button>
        )}
      </div>

      {state.matches('done') && <h2>Workout Complete!</h2>}
    </div>
  );
};
