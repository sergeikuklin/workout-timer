import Dexie, { type EntityTable } from 'dexie';

export type Workout = {
  id: number;
  title: string;
  workTime: string;
  restTime: string;
  exercises: number;
  sets: number;
  breakTime: string;
};

export const db = new Dexie('WorkoutTimer') as Dexie & {
  workouts: EntityTable<Workout, 'id'>;
};

// Schema declaration:
db.version(1).stores({
  workouts: '++id, title, workTime, restTime, exercises, sets, breakTime', // primary key "id" (for the runtime!)
});
