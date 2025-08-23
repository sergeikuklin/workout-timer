import {
  LoaderFunction,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import { WorkoutsPage } from './WorkoutsPage';
import { AddWorkoutPage } from './AddWorkoutPage';
import { WorkoutPage } from './WorkoutPage';
import { EditWorkoutPage } from './EditWorkoutPage';
import { getWorkout, getWorkouts } from 'shared/model';

const workoutLoader: LoaderFunction = async ({ params }) => {
  try {
    const workout = await getWorkout(Number(params.workoutId));
    if (!workout) {
      return redirect('/');
    }
    return workout;
  } catch {
    return redirect('/');
  }
};

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <WorkoutsPage />,
      loader: async () => getWorkouts(),
    },
    {
      path: '/add-workout',
      element: <AddWorkoutPage />,
    },
    {
      path: '/edit-workout/:workoutId',
      element: <EditWorkoutPage />,
      loader: workoutLoader,
    },
    {
      path: '/workout/:workoutId',
      element: <WorkoutPage />,
      loader: workoutLoader,
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

export const Routing = () => {
  return <RouterProvider router={router} />;
};
