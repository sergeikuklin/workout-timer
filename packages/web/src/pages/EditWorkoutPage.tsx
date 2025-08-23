import { EditWorkout } from 'features/EditWorkout';
import { useLoaderData } from 'react-router-dom';
import type { Workout } from 'shared/model';
import { Page } from 'shared/ui/Page';

export const EditWorkoutPage = () => {
  const workout = useLoaderData() as Workout;

  return (
    <Page title="Edit Workout">
      <EditWorkout workout={workout} />
    </Page>
  );
};
