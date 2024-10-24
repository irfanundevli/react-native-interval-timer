import { Interval } from './types';
import { Workout } from './Workout';

const SECOND = 1000;
const MINUTE = 60 * SECOND;

describe('Workout', () => {
  it('returns current interval', () => {
    const exercise: Interval = { name: 'Exercise', type: 'exercise', duration: 1 * MINUTE };
    const rest: Interval = { name: 'Rest', type: 'rest', duration: 5 * SECOND };
    const workout = new Workout({ cycles: 1, exercise, rest, roundsPerCycle: 1 });

    expect(workout.currentInterval).toBe(exercise);
  });

  it('returns next interval', () => {
    const exercise: Interval = { name: 'Exercise', type: 'exercise', duration: 66 * 1000 };
    const rest: Interval = { name: 'Rest', type: 'rest', duration: 60 * 1000 };
    const workout = new Workout({ cycles: 1, exercise, rest, roundsPerCycle: 1 });

    expect(workout.nextInterval).toBe(rest);
  });

  it('returns cycle status', () => {
    const exercise: Interval = { name: 'Exercise', type: 'exercise', duration: 66 * SECOND };
    const rest: Interval = { name: 'Rest', type: 'rest', duration: 60 * SECOND };

    const workout = new Workout({ cycles: 2, exercise, rest, roundsPerCycle: 1 });

    expect(workout.cycleStatus).toBe('1/2');

    workout.next();
    expect(workout.cycleStatus).toBe('1/2');

    workout.next();
    expect(workout.cycleStatus).toBe('2/2');

    workout.next();
    expect(workout.cycleStatus).toBe('2/2');
  });

  it('returns round status', () => {
    const exercise: Interval = { name: 'Exercise', type: 'exercise', duration: 66 * SECOND };
    const rest: Interval = { name: 'Rest', type: 'rest', duration: 60 * SECOND };

    const workout = new Workout({ cycles: 1, exercise, rest, roundsPerCycle: 2 });

    expect(workout.roundStatus).toBe('1/2');

    workout.next();
    expect(workout.roundStatus).toBe('1/2');

    workout.next();
    expect(workout.roundStatus).toBe('2/2');

    workout.next();
    expect(workout.roundStatus).toBe('2/2');
  });

  it('calculates total remaining time', () => {
    const exercise: Interval = { name: 'Exercise', type: 'exercise', duration: 1 * MINUTE };
    const rest: Interval = { name: 'Rest', type: 'rest', duration: 5 * SECOND };

    const workout = new Workout({ cycles: 2, exercise, rest, roundsPerCycle: 4 });

    expect(workout.calculateTotalRemainingTime(1 * MINUTE)).toEqual(520000);

    workout.next();
    expect(workout.calculateTotalRemainingTime(2 * SECOND)).toEqual(457000);

    workout.next();
    expect(workout.calculateTotalRemainingTime(30 * SECOND)).toEqual(425000);
  });

  it('resets the workout state', () => {
    const workout = new Workout({
      cycles: 2,
      exercise: { name: 'Exercise', type: 'exercise', duration: 1 * MINUTE },
      rest: { name: 'Rest', type: 'rest', duration: 5 * SECOND },
      roundsPerCycle: 2,
    });

    // first round
    workout.next();
    workout.next();
    // second round
    workout.next();
    workout.next();

    expect(workout.roundStatus).toBe('1/2');
    expect(workout.cycleStatus).toBe('2/2');

    workout.reset();

    expect(workout.roundStatus).toBe('1/2');
    expect(workout.cycleStatus).toBe('1/2');
  });
});
