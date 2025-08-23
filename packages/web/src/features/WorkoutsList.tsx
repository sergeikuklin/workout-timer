import { Link, useRevalidator } from 'react-router-dom';
import type { Workout } from 'shared/model';
import { deleteWorkout } from 'shared/model';

type WorkoutsListProps = {
  workouts: Workout[];
};

export const WorkoutsList = ({ workouts }: WorkoutsListProps) => {
  const { revalidate } = useRevalidator();

  const handleRemoveWorkout = async (id: number) => {
    try {
      await deleteWorkout(id);
      revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="divide-solid divide-gray-300 divide-y hover:bg-gray-50 rounded-md">
      {workouts.map((workout) => (
        <div className="navbar items-stretch" key={workout.id}>
          <Link
            to={`/workout/${workout.id}`}
            className=" container navbar-start"
          >
            {workout.title}
          </Link>
          <div className="navbar-end space-x-3">
            <Link
              className="btn btn-outline btn-primary "
              to={`/edit-workout/${workout.id}`}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-outline btn-error"
              onClick={() => handleRemoveWorkout(workout.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
