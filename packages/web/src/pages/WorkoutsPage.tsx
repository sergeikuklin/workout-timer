import { useLoaderData, useNavigate } from 'react-router-dom';
import type { Workout } from '@workout-interval/shared';
import { WorkoutsList } from 'features/WorkoutsList';
import { Page } from 'shared/ui/Page';
import { Button } from 'shared/ui';

export const WorkoutsPage = () => {
  const workouts = useLoaderData() as Workout[];
  const navigate = useNavigate();

  return (
    <Page title="Workouts">
      <WorkoutsList workouts={workouts || []} />

      <Button className="mt-5" onClick={() => navigate('/add-workout')}>
        Add Workout
      </Button>
    </Page>
  );
};
