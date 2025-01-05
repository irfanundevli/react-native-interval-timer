import { useEffect, useState } from 'react';
import { Workout, getWorkout } from '@/store';

export function useWorkout(): Workout | undefined {
  const [workout, setWorkout] = useState<Workout | undefined>();

  useEffect(() => {
    async function loadWorkout() {
      const workout = await getWorkout();
      setWorkout(workout);
    }

    loadWorkout();
  }, []);

  return workout;
}
