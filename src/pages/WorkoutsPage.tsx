import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { db } from 'shared/model';
import { WorkoutsList } from 'features/WorkoutsList';

export const WorkoutsPage = () => {
  const workouts = useLiveQuery(() => db.workouts.toArray());

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center">Workouts</h1>

      <WorkoutsList workouts={workouts || []} />

      <Link className="btn btn-primary mt-5" to="/add-workout">
        Add Workout
      </Link>
    </div>
  );
};
