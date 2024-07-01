import { useLiveQuery } from 'dexie-react-hooks';
import { WorkoutTimer } from 'features/WorkoutTimer';
import { useParams } from 'react-router-dom';
import { db } from 'shared/model';
import { Page } from 'shared/ui/Page';

export const WorkoutPage = () => {
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
    <Page title={workout.title}>
      <WorkoutTimer workout={workout} />
    </Page>
  );
};
