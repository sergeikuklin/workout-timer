import { useForm } from 'react-hook-form';
import { InputField } from 'shared/ui';
import { addWorkout, updateWorkout } from 'shared/model';
import {
  Workout,
  WorkoutFormData,
  DEFAULT_WORKOUT,
} from '@workout-interval/shared';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type EditFormValues = WorkoutFormData;

type WorkoutEditProps = {
  workout?: Workout;
};

export const EditWorkout: FC<WorkoutEditProps> = ({ workout }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EditFormValues>({
    defaultValues: DEFAULT_WORKOUT,
    mode: 'onChange',
  });

  useEffect(() => {
    if (!workout) {
      return;
    }

    reset(workout);
  }, [reset, workout]);

  const handleAdd = async (data: EditFormValues) => {
    const id = await addWorkout(data);
    console.log('Workout added with id:', id);
  };

  const handleEdit = async (data: EditFormValues) => {
    if (!workout?.id) return;
    const id = await updateWorkout({ ...data, id: workout.id });
    console.log('Workout updated:', id);
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      const mutate = workout ? handleEdit : handleAdd;
      await mutate(data);
      navigate('/');
    } catch (error) {
      console.error('Failed to save workout:', error);
      // TODO: Show error toast/notification
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-5">
            <h2 className="card-title text-lg mb-3 flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              Basic Information
            </h2>

            <InputField
              label="Workout Title"
              type="text"
              {...register('title', {
                required: 'Workout title is required',
                minLength: {
                  value: 2,
                  message: 'Title must be at least 2 characters long',
                },
              })}
              error={errors.title?.message}
              placeholder="e.g., HIIT Morning Routine"
            />
          </div>
        </div>

        {/* Timing Section */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-5">
            <h2 className="card-title text-lg mb-3 flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
              Timing Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <InputField
                  label="Work Time"
                  type="time"
                  {...register('workTime')}
                />
                <p className="text-xs text-base-content/60 mt-1">
                  Active exercise time
                </p>
              </div>

              <div>
                <InputField
                  label="Rest Time"
                  type="time"
                  {...register('restTime')}
                />
                <p className="text-xs text-base-content/60 mt-1">
                  Recovery between exercises
                </p>
              </div>

              <div>
                <InputField
                  label="Break Time"
                  type="time"
                  {...register('breakTime')}
                />
                <p className="text-xs text-base-content/60 mt-1">
                  Rest between sets
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Structure Section */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-5">
            <h2 className="card-title text-lg mb-3 flex items-center">
              <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
              Workout Structure
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <InputField
                  label="Number of Exercises"
                  type="number"
                  min={1}
                  max={50}
                  {...register('exercises', {
                    required: 'Number of exercises is required',
                    min: {
                      value: 1,
                      message: 'Must have at least 1 exercise',
                    },
                    max: {
                      value: 50,
                      message: 'Cannot exceed 50 exercises',
                    },
                  })}
                  error={errors.exercises?.message}
                />
                <p className="text-xs text-base-content/60 mt-1">
                  Exercises per set (1-50)
                </p>
              </div>

              <div>
                <InputField
                  label="Number of Sets"
                  type="number"
                  min={1}
                  max={10}
                  {...register('sets', {
                    required: 'Number of sets is required',
                    min: {
                      value: 1,
                      message: 'Must have at least 1 set',
                    },
                    max: {
                      value: 10,
                      message: 'Cannot exceed 10 sets',
                    },
                  })}
                  error={errors.sets?.message}
                />
                <p className="text-xs text-base-content/60 mt-1">
                  Total sets to complete (1-10)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2 pb-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-outline flex-1 sm:flex-none sm:min-w-32"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className={`btn btn-primary flex-1 text-white ${
              isSubmitting ? 'loading' : ''
            }`}
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                {workout ? 'Updating...' : 'Creating...'}
              </>
            ) : workout ? (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Update Workout
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Workout
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
