import { Interval } from './types';

export class Workout {
  private _completedIntervals: Interval[] = [];
  private _currIntervalIdx: number = 0;
  private _currRound: number = 0;
  private _currCycle: number = 0;

  private readonly _cycles!: number;
  private readonly _rounds!: number;
  private readonly _intervals: Interval[] = [];
  private readonly _totalDuration: number = 0;
  private readonly _intervalCountPerRound: number = 0;
  private readonly _intervalCountPerCycle: number = 0;

  constructor(w: { cycles: number; exercise: Interval; rest?: Interval; roundsPerCycle: number }) {
    this._cycles = w.cycles;
    this._rounds = w.roundsPerCycle;

    for (let i = 0; i < this._cycles * this._rounds; i++) {
      this._intervals.push(w.exercise);
      if (w.rest) {
        this._intervals.push(w.rest);
      }
    }

    this._totalDuration = this._intervals.reduce((acc, interval) => acc + interval.duration, 0);
    this._intervalCountPerRound = 1 + (w.rest ? 1 : 0);
    this._intervalCountPerCycle = this._intervalCountPerRound * this._rounds;
  }

  get remainingCycles(): number {
    return this._cycles - this._currCycle;
  }

  get remainingRounds(): number {
    return this._rounds - this._currRound;
  }

  calculateTotalRemainingTime(offset: number): number {
    const completedIntervalsDuration = this._completedIntervals.reduce((acc, interval) => acc + interval.duration, 0);

    return this._totalDuration - completedIntervalsDuration - this.currentInterval.duration + offset;
  }

  next(): void {
    this._completedIntervals.push(this.currentInterval);
    if (this._completedIntervals.length === this._intervals.length) return;

    this._currIntervalIdx++;

    if (this._completedIntervals.length % this._intervalCountPerRound === 0) {
      this._currRound++;
    }

    if (this._completedIntervals.length % this._intervalCountPerCycle === 0) {
      this._currCycle++;
      this._currRound = 0;
    }
  }

  get currentInterval(): Interval {
    return this._intervals[this._currIntervalIdx];
  }

  get nextInterval(): Interval | undefined {
    return this._intervals[this._currIntervalIdx + 1];
  }

  /** Reset the workout state to its initial configuration */
  reset() {
    this._completedIntervals = [];
    this._currIntervalIdx = 0;
    this._currRound = 0;
    this._currCycle = 0;
  }
}
