import { useLiveQuery } from 'dexie-react-hooks';
import { EditWorkout } from 'features/EditWorkout';
import { useParams } from 'react-router-dom';
import { db } from 'shared/model';

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
    <div className="container mx-auto px-4">
      <h1 className="text-center">Edit Workouts</h1>

      <EditWorkout workout={workout} />
    </div>
  );
};
