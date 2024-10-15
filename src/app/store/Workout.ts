import { Interval } from './types';

export class Workout {
  private currIntervalIdx: number = 0;
  private currRound: number = 0;
  private currCycle: number = 0;

  private readonly cycles!: number;
  private readonly rounds!: number;
  private readonly intervals: Interval[] = [];
  private readonly completedIntervals: Interval[] = [];
  private readonly totalDuration: number = 0;
  private readonly intervalCountPerRound: number = 0;
  private readonly intervalCountPerCycle: number = 0;

  constructor(w: { cycles: number; exercise: Interval; rest?: Interval; roundsPerCycle: number }) {
    this.cycles = w.cycles;
    this.rounds = w.roundsPerCycle;

    for (let i = 0; i < this.cycles * this.rounds; i++) {
      this.intervals.push(w.exercise);
      if (w.rest) {
        this.intervals.push(w.rest);
      }
    }

    this.totalDuration = this.intervals.reduce((acc, interval) => acc + interval.duration, 0);
    this.intervalCountPerRound = 1 + (w.rest ? 1 : 0);
    this.intervalCountPerCycle = this.intervalCountPerRound * this.rounds;
  }

  get remainingCycles(): number {
    return this.cycles - this.currCycle;
  }

  get remainingRounds(): number {
    return this.rounds - this.currRound;
  }

  calculateTotalRemainingTime(offset: number): number {
    const completedIntervalsDuration = this.completedIntervals.reduce((acc, interval) => acc + interval.duration, 0);

    return this.totalDuration - completedIntervalsDuration - this.currentInterval.duration + offset;
  }

  get totalIntervalCount(): number {
    return this.intervals.length;
  }

  next(): void {
    this.completedIntervals.push(this.currentInterval);
    if (this.completedIntervals.length === this.intervals.length) return;

    this.currIntervalIdx++;

    if (this.completedIntervals.length % this.intervalCountPerRound === 0) {
      this.currRound++;
    }

    if (this.completedIntervals.length % this.intervalCountPerCycle === 0) {
      this.currCycle++;
      this.currRound = 0;
    }
  }

  get currentInterval(): Interval {
    return this.intervals[this.currIntervalIdx];
  }

  get nextInterval(): Interval | undefined {
    return this.intervals[this.currIntervalIdx + 1];
  }
}
