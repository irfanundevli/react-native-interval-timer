import { useEffect, useState } from 'react';
import { Workout, DEFAULT_WORKOUT, getWorkout } from '@/store';

export function useWorkout(): Workout {
  const [workout, setWorkout] = useState(DEFAULT_WORKOUT);

  useEffect(() => {
    async function loadWorkout() {
      const workout = await getWorkout();
      setWorkout(workout);
    }

    loadWorkout();
  }, []);

  return workout;
}
