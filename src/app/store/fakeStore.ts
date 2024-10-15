import { Workout } from './Workout';

export function getWorkout(): Workout {
  return new Workout({
    cycles: 2,
    exercise: { name: 'Exercise', type: 'exercise', duration: 5 * 1000 },
    rest: { name: 'Rest', type: 'rest', duration: 2 * 1000 },
    roundsPerCycle: 2,
  });
}
