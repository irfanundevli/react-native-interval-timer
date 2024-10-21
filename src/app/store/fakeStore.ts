import { Workout } from './Workout';

export function getWorkout(): Workout {
  return new Workout({
    cycles: 2,
    exercise: { name: 'exercise', type: 'exercise', duration: 5 * 1000 },
    rest: { name: 'rest', type: 'rest', duration: 2 * 1000 },
    roundsPerCycle: 2,
  });
}
