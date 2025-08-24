import { useRevalidator, useNavigate } from 'react-router-dom';
import type { Workout } from '@workout-interval/shared';
import { deleteWorkout } from 'shared/model';
import { Button } from '@/components/ui/button';

type WorkoutsListProps = {
  workouts: Workout[];
};

export const WorkoutsList = ({ workouts }: WorkoutsListProps) => {
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();

  const handleRemoveWorkout = async (id: number) => {
    try {
      await deleteWorkout(id);
      revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="divide-y divide-border rounded-md border">
      {workouts.map((workout) => (
        <div
          className="flex items-center justify-between p-4 hover:bg-muted/50"
          key={workout.id}
        >
          <button
            onClick={() => navigate(`/workout/${workout.id}`)}
            className="flex-1 text-left hover:text-primary transition-colors font-medium"
          >
            {workout.title}
          </button>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/edit-workout/${workout.id}`)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleRemoveWorkout(workout.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
