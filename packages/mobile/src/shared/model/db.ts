import type { Workout, WorkoutFormData } from '@workout-interval/shared';
import { Storage, STORAGE_KEYS } from './storage';

/**
 * Database layer for workout management using AsyncStorage
 * Provides the same interface as the web app's Dexie database
 */
export class WorkoutDatabase {
  /**
   * Get all workouts
   */
  static async getWorkouts(): Promise<Workout[]> {
    const workouts = await Storage.getItem<Workout[]>(STORAGE_KEYS.WORKOUTS);
    return workouts || [];
  }

  /**
   * Get a single workout by ID
   */
  static async getWorkout(workoutId: number): Promise<Workout | undefined> {
    const workouts = await this.getWorkouts();
    return workouts.find((workout) => workout.id === workoutId);
  }

  /**
   * Add a new workout
   */
  static async addWorkout(workoutData: WorkoutFormData): Promise<number> {
    const workouts = await this.getWorkouts();
    const newId = await this.getNextId();

    const newWorkout: Workout = {
      id: newId,
      ...workoutData,
    };

    const updatedWorkouts = [...workouts, newWorkout];
    await Storage.setItem(STORAGE_KEYS.WORKOUTS, updatedWorkouts);

    return newId;
  }

  /**
   * Update an existing workout
   */
  static async updateWorkout(workout: Workout): Promise<number> {
    const workouts = await this.getWorkouts();
    const workoutIndex = workouts.findIndex((w) => w.id === workout.id);

    if (workoutIndex === -1) {
      throw new Error(`Workout with ID ${workout.id} not found`);
    }

    const updatedWorkouts = [...workouts];
    updatedWorkouts[workoutIndex] = workout;

    await Storage.setItem(STORAGE_KEYS.WORKOUTS, updatedWorkouts);
    return workout.id;
  }

  /**
   * Delete a workout by ID
   */
  static async deleteWorkout(id: number): Promise<void> {
    const workouts = await this.getWorkouts();
    const filteredWorkouts = workouts.filter((workout) => workout.id !== id);

    await Storage.setItem(STORAGE_KEYS.WORKOUTS, filteredWorkouts);
  }

  /**
   * Clear all workouts (for testing or reset)
   */
  static async clearAllWorkouts(): Promise<void> {
    await Storage.removeItem(STORAGE_KEYS.WORKOUTS);
    await Storage.removeItem(STORAGE_KEYS.WORKOUT_COUNTER);
  }

  /**
   * Get the next available ID for a new workout
   */
  private static async getNextId(): Promise<number> {
    const currentCounter = await Storage.getItem<number>(
      STORAGE_KEYS.WORKOUT_COUNTER
    );
    const nextId = (currentCounter || 0) + 1;
    await Storage.setItem(STORAGE_KEYS.WORKOUT_COUNTER, nextId);
    return nextId;
  }
}

// Export functions with the same names as the web app for consistency
export const getWorkouts = WorkoutDatabase.getWorkouts;
export const getWorkout = WorkoutDatabase.getWorkout;
export const addWorkout = WorkoutDatabase.addWorkout;
export const updateWorkout = WorkoutDatabase.updateWorkout;
export const deleteWorkout = WorkoutDatabase.deleteWorkout;
