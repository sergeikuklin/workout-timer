import { useLiveQuery } from 'dexie-react-hooks';
import { WorkoutTimer } from 'features/WorkoutTimer';
import { useParams } from 'react-router-dom';
import { db } from 'shared/model';

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
    <div className="container mx-auto px-4">
      <h1 className="text-center">{workout.title}</h1>

      <WorkoutTimer workout={workout} />
    </div>
  );
};
