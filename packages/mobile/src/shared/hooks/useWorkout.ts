import React, { useState, useEffect, useCallback } from 'react';
import type { Workout } from '@workout-interval/shared';
import { WorkoutDatabase } from '../model/db';

/**
 * Custom hook for managing a single workout
 */
export const useWorkout = (workoutId: number | null) => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load workout from storage
  const loadWorkout = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const storedWorkout = await WorkoutDatabase.getWorkout(id);
      setWorkout(storedWorkout || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workout');
      console.error('Error loading workout:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update the current workout
  const updateWorkout = useCallback(
    async (updatedWorkout: Workout): Promise<boolean> => {
      try {
        setError(null);
        await WorkoutDatabase.updateWorkout(updatedWorkout);
        setWorkout(updatedWorkout); // Update local state
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update workout'
        );
        console.error('Error updating workout:', err);
        return false;
      }
    },
    []
  );

  // Delete the current workout
  const deleteWorkout = useCallback(async (): Promise<boolean> => {
    if (!workout) return false;

    try {
      setError(null);
      await WorkoutDatabase.deleteWorkout(workout.id);
      setWorkout(null); // Clear local state
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workout');
      console.error('Error deleting workout:', err);
      return false;
    }
  }, [workout]);

  // Load workout when workoutId changes
  useEffect(() => {
    if (workoutId !== null) {
      loadWorkout(workoutId);
    } else {
      setWorkout(null);
      setLoading(false);
    }
  }, [workoutId, loadWorkout]);

  return {
    workout,
    loading,
    error,
    updateWorkout,
    deleteWorkout,
    refresh: workoutId !== null ? () => loadWorkout(workoutId) : () => {},
  };
};
