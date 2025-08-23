import Dexie, { type EntityTable } from 'dexie';
import type { Workout } from '../types';

export const db = new Dexie('WorkoutTimer') as Dexie & {
  workouts: EntityTable<Workout, 'id'>;
};

// Schema declaration:
db.version(1).stores({
  workouts: '++id, title, workTime, restTime, exercises, sets, breakTime',
});

export const getWorkouts = async (): Promise<Workout[]> => {
  return db.workouts.toArray();
};

export const getWorkout = async (
  workoutId: number
): Promise<Workout | undefined> => {
  return db.workouts.get(workoutId);
};

export const addWorkout = async (
  workout: Omit<Workout, 'id'>
): Promise<number> => {
  return db.workouts.add(workout);
};

export const updateWorkout = async (workout: Workout): Promise<number> => {
  return db.workouts.put(workout);
};

export const deleteWorkout = async (id: number): Promise<void> => {
  return db.workouts.delete(id);
};
