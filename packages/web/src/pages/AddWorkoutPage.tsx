import { EditWorkout } from 'features/EditWorkout';
import { Page } from 'shared/ui/Page';

export const AddWorkoutPage = () => {
  return (
    <Page title="Add Workouts">
      <EditWorkout />
    </Page>
  );
};
