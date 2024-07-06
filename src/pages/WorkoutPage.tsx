import { WorkoutTimer } from 'features/WorkoutTimer';
import { useLoaderData } from 'react-router-dom';
import { useWakeLock } from 'shared/hooks/useWakeLock';
import { Workout } from 'shared/model';
import { Page } from 'shared/ui/Page';

export const WorkoutPage = () => {
  useWakeLock();

  const workout = useLoaderData() as Workout;

  return (
    <Page title={workout.title}>
      <WorkoutTimer workout={workout} />
    </Page>
  );
};
