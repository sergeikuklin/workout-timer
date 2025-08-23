import { assign, fromCallback, setup } from 'xstate';

type WorkoutTimerContext = {
  workTime: number;
  restTime: number;
  breakTime: number;
  exercises: number;
  sets: number;
  currentExercise: number;
  currentSet: number;
  time: number;
  timeLeft: number;
};

type SoundCallbacks = {
  playSecondSound: () => void;
  playLastSecondSound: () => void;
  playCompleteSound: () => void;
};

export const createWorkoutTimerMachine = (soundCallbacks: SoundCallbacks) => {
  return setup({
    types: {
      context: {} as WorkoutTimerContext,
      input: {} as Pick<
        WorkoutTimerContext,
        'workTime' | 'restTime' | 'breakTime' | 'exercises' | 'sets'
      >,
    },
    guards: {
      hasMoreExercises: ({ context }) =>
        context.currentExercise < context.exercises,
      hasMoreSets: ({ context }) => context.currentSet < context.sets,
    },
    delays: {
      INTERVAL: ({ context }) => {
        return context.timeLeft * 1000 + 1000;
      },
    },
    actions: {
      TICK: assign({
        timeLeft: ({ context }) => {
          const newTimeLeft = context.timeLeft - 1;

          if (newTimeLeft <= 3 && newTimeLeft >= 2) {
            soundCallbacks.playSecondSound();
          }

          if (newTimeLeft === 1) {
            soundCallbacks.playLastSecondSound();
          }

          if (newTimeLeft === 0) {
            soundCallbacks.playCompleteSound();
          }

          return newTimeLeft;
        },
      }),
    },
    actors: {
      ticks: fromCallback(({ sendBack }) => {
        const interval = setInterval(() => {
          sendBack({ type: 'TICK' });
        }, 1000);
        return () => clearInterval(interval);
      }),
    },
  }).createMachine({
    id: 'workoutTimer',
    initial: 'idle',
    context: ({ input }) => {
      return {
        workTime: input.workTime ?? 0,
        restTime: input.restTime ?? 0,
        breakTime: input.breakTime ?? 0,
        exercises: input.exercises ?? 0,
        sets: input.sets ?? 0,
        currentExercise: 1,
        currentSet: 1,
        time: 0,
        timeLeft: 0,
      };
    },
    states: {
      idle: {
        on: {
          START: 'work',
        },
      },
      work: {
        initial: 'running',
        entry: assign({
          time: ({ context }) => context.workTime,
          timeLeft: ({ context }) => context.workTime,
        }),
        states: {
          running: {
            invoke: {
              src: 'ticks',
            },
            after: {
              INTERVAL: [
                { target: '#workoutTimer.rest', guard: 'hasMoreExercises' },
                { target: '#workoutTimer.break', guard: 'hasMoreSets' },
                { target: '#workoutTimer.done' },
              ],
            },
            on: {
              TICK: {
                actions: 'TICK',
              },
              PAUSE: 'paused',
            },
          },
          paused: {
            on: {
              RESUME: 'running',
            },
          },
        },
      },
      rest: {
        initial: 'running',
        entry: assign({
          time: ({ context }) => context.restTime,
          timeLeft: ({ context }) => context.restTime,
        }),
        exit: assign({
          currentExercise: ({ context }) => context.currentExercise + 1,
        }),
        states: {
          running: {
            invoke: {
              src: 'ticks',
            },
            after: {
              INTERVAL: '#workoutTimer.work',
            },
            on: {
              TICK: {
                actions: 'TICK',
              },
              PAUSE: 'paused',
            },
          },
          paused: {
            on: {
              RESUME: 'running',
            },
          },
        },
      },
      break: {
        initial: 'running',
        entry: assign({
          time: ({ context }) => context.breakTime,
          timeLeft: ({ context }) => context.breakTime,
        }),
        exit: assign({
          currentExercise: 1,
          currentSet: ({ context }) => context.currentSet + 1,
        }),
        states: {
          running: {
            invoke: {
              src: 'ticks',
            },
            after: {
              INTERVAL: [
                { target: '#workoutTimer.work', guard: 'hasMoreSets' },
                { target: '#workoutTimer.done' },
              ],
            },
            on: {
              TICK: {
                actions: 'TICK',
              },
              PAUSE: 'paused',
            },
          },
          paused: {
            on: {
              RESUME: 'running',
            },
          },
        },
      },
      done: {
        type: 'final',
      },
    },
  });
};
