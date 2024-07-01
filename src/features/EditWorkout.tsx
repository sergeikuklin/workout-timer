import { useForm } from 'react-hook-form';
import { InputField } from 'shared/ui';
import { db, Workout } from 'shared/model';
import { FC, useEffect } from 'react';

type EditFormValues = Omit<Workout, 'id'>;

type WorkoutEditProps = {
  workout?: Workout;
};

export const EditWorkout: FC<WorkoutEditProps> = ({ workout }) => {
  const { register, handleSubmit, reset } = useForm<EditFormValues>({
    defaultValues: {
      workTime: '00:00',
      restTime: '00:00',
      exercises: 1,
      sets: 1,
      breakTime: '00:00',
    },
  });

  useEffect(() => {
    if (!workout) {
      return;
    }

    reset(workout);
  }, [reset, workout]);

  const handleAdd = async (data: EditFormValues) => {
    const id = await db.workouts.add(data);

    console.log('Workout added with id:', id);
  };

  const handleEdit = async (data: EditFormValues) => {
    const id = await db.workouts.put({ ...data, id: workout?.id });

    console.log('Workout updated:', id);
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      if (workout) {
        handleEdit(data);
      } else {
        handleAdd(data);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <InputField label="Title" type="text" {...register('title')} />

      <InputField label="Work" type="time" {...register('workTime')} />

      <InputField label="Rest" type="time" {...register('restTime')} />

      <InputField
        label="Exercises"
        type="number"
        min={1}
        {...register('exercises')}
      />

      <InputField label="Sets" type="number" min={1} {...register('sets')} />

      <InputField label="Set break" type="time" {...register('breakTime')} />

      <button className="btn btn-primary mt-5" type="submit">
        Save
      </button>
    </form>
  );
};
