import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { WorkoutsPage } from './WorkoutsPage';
import { AddWorkoutPage } from './AddWorkoutPage';
import { WorkoutPage } from './WorkoutPage';
import { EditWorkoutPage } from './EditWorkoutPage';
import { getWorkout, getWorkouts } from 'shared/model';

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
      loader: async ({ params }) => getWorkout(Number(params.workoutId)),
    },
    {
      path: '/workout/:workoutId',
      element: <WorkoutPage />,
      loader: async ({ params }) => getWorkout(Number(params.workoutId)),
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

console.log(import.meta.env.BASE_URL);

export const Routing = () => {
  return <RouterProvider router={router} />;
};
