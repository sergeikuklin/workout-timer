import { WorkoutTimer } from 'features/WorkoutTimer';
import { useLoaderData } from 'react-router-dom';
import { Workout } from 'shared/model';
import { Page } from 'shared/ui/Page';

export const WorkoutPage = () => {
  const workout = useLoaderData() as Workout;

  return (
    <Page title={workout.title}>
      <WorkoutTimer workout={workout} />
    </Page>
  );
};
