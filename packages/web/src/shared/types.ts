export type Workout = {
  id: number;
  title: string;
  workTime: string;
  restTime: string;
  exercises: number;
  sets: number;
  breakTime: string;
};

export type WorkoutFormData = Omit<Workout, 'id'>;
