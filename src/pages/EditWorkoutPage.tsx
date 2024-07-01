import { EditWorkout } from 'features/EditWorkout';
import { useLoaderData } from 'react-router-dom';
import { Workout } from 'shared/model';
import { Page } from 'shared/ui/Page';

export const EditWorkoutPage = () => {
  const workout = useLoaderData() as Workout;

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <Page title="Edit Workouts">
      <EditWorkout workout={workout} />
    </Page>
  );
};
