import { Link, useLoaderData } from 'react-router-dom';
import type { Workout } from 'shared/model';
import { WorkoutsList } from 'features/WorkoutsList';
import { Page } from 'shared/ui/Page';

export const WorkoutsPage = () => {
  const workouts = useLoaderData() as Workout[];

  return (
    <Page title="Workouts">
      <WorkoutsList workouts={workouts || []} />

      <Link className="btn btn-primary mt-5" to="/add-workout">
        Add Workout
      </Link>
    </Page>
  );
};
