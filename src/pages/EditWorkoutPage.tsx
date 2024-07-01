import { useLiveQuery } from 'dexie-react-hooks';
import { EditWorkout } from 'features/EditWorkout';
import { useParams } from 'react-router-dom';
import { db } from 'shared/model';
import { Page } from 'shared/ui/Page';

export const EditWorkoutPage = () => {
  const { workoutId } = useParams();

  const workout = useLiveQuery(async () => {
    if (!workoutId) {
      return;
    }

    return db.workouts.get(Number(workoutId));
  });

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <Page title="Edit Workouts">
      <EditWorkout workout={workout} />
    </Page>
  );
};
