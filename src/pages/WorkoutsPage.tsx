import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { db } from 'shared/model';
import { WorkoutsList } from 'features/WorkoutsList';
import { Page } from 'shared/ui/Page';

export const WorkoutsPage = () => {
  const workouts = useLiveQuery(() => db.workouts.toArray());

  return (
    <Page title="Workouts">
      <WorkoutsList workouts={workouts || []} />

      <Link className="btn btn-primary mt-5" to="/add-workout">
        Add Workout
      </Link>
    </Page>
  );
};
