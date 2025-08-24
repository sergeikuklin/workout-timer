import React, { useState, useEffect, useCallback } from 'react';
import type { Workout, WorkoutFormData } from '@workout-interval/shared';
import { WorkoutDatabase } from '../model/db';

/**
 * Custom hook for managing workouts data
 */
export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load workouts from storage
  const loadWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading workouts...');
      const storedWorkouts = await WorkoutDatabase.getWorkouts();
      console.log('Loaded workouts:', storedWorkouts.length, 'workouts');
      setWorkouts(storedWorkouts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workouts');
      console.error('Error loading workouts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new workout
  const addWorkout = useCallback(
    async (workoutData: WorkoutFormData): Promise<number | null> => {
      try {
        setError(null);
        console.log('Adding workout to database:', workoutData);
        const newId = await WorkoutDatabase.addWorkout(workoutData);
        console.log('Workout added with ID:', newId);
        await loadWorkouts(); // Refresh the list
        return newId;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add workout');
        console.error('Error adding workout:', err);
        return null;
      }
    },
    [loadWorkouts]
  );

  // Update an existing workout
  const updateWorkout = useCallback(
    async (workout: Workout): Promise<boolean> => {
      try {
        setError(null);
        await WorkoutDatabase.updateWorkout(workout);
        await loadWorkouts(); // Refresh the list
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update workout'
        );
        console.error('Error updating workout:', err);
        return false;
      }
    },
    [loadWorkouts]
  );

  // Delete a workout
  const deleteWorkout = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        setError(null);
        await WorkoutDatabase.deleteWorkout(id);
        await loadWorkouts(); // Refresh the list
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to delete workout'
        );
        console.error('Error deleting workout:', err);
        return false;
      }
    },
    [loadWorkouts]
  );

  // Load workouts on mount
  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  return {
    workouts,
    loading,
    error,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    refresh: loadWorkouts,
  };
};
