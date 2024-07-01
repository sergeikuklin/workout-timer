import { db } from './db';

export const getWorkouts = async () => {
  return db.workouts.toArray();
};

export const getWorkout = async (workoutId: number) => {
  return db.workouts.get(workoutId);
};
