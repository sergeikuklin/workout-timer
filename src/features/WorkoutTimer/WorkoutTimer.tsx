import { Workout } from 'shared/model';
import { workoutTimerMachine } from './timerMachine';
import { useMachine } from '@xstate/react';
import { FC } from 'react';

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
    send({ type: 'START' });
  };

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
    typeof state.value === 'object'
      ? Object.keys(state.value).join()
      : state.value;

  return (
    <div className="text-center flex justify-center flex-col ">
      <h2>{stateValue}</h2>

      <div className="font-mono text-6xl">
        {`${Math.floor(state.context.timeLeft / 60)}`.padStart(2, '0')}:
        {`${state.context.timeLeft % 60}`.padStart(2, '0')}
      </div>
      {state.value !== 'idle' && (
        <>
          <h2>
            Exercise {state.context.currentExercise} of {workout.exercises}
          </h2>
          <h2>
            Set {state.context.currentSet} of {workout.sets}
          </h2>
        </>
      )}

      {state.matches('idle') && (
        <button onClick={startWorkout} className="btn btn-active btn-accent">
          Start
        </button>
      )}

      {isRunning && (
        <button
          onClick={() => send({ type: 'PAUSE' })}
          className="btn btn-active btn-warning"
        >
          Pause
        </button>
      )}

      {isPaused && (
        <button
          onClick={() => send({ type: 'RESUME' })}
          className="btn btn-active btn-success"
        >
          Resume
        </button>
      )}

      {state.matches('done') && <h2>Workout Complete!</h2>}
    </div>
  );
};
