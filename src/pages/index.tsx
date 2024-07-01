import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { WorkoutsPage } from './WorkoutsPage';
import { AddWorkoutPage } from './AddWorkoutPage';
import { WorkoutPage } from './WorkoutPage';
import { EditWorkoutPage } from './EditWorkoutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WorkoutsPage />,
  },
  {
    path: '/add-workout',
    element: <AddWorkoutPage />,
  },
  {
    path: '/edit-workout/:workoutId',
    element: <EditWorkoutPage />,
  },
  {
    path: '/workout/:workoutId',
    element: <WorkoutPage />,
  },
]);

export const Routing = () => {
  return <RouterProvider router={router} />;
};
