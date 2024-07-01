import { Link } from 'react-router-dom';
import { Workout, db } from 'shared/model';

type WorkoutsListProps = {
  workouts: Workout[];
};

export const WorkoutsList = ({ workouts }: WorkoutsListProps) => {
  const handleRemoveWorkout = async (id: number) => {
    try {
      await db.workouts.delete(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="divide-solid divide-gray-300 divide-y">
      {workouts.map((workout) => (
        <div className="navbar" key={workout.id}>
          <div className="navbar-start">
            <Link to={`/workout/${workout.id}`}>{workout.title}</Link>
          </div>
          <div className="navbar-end space-x-3">
            <Link
              className="btn btn-outline btn-primary"
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
