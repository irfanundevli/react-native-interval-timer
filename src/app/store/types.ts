export type IntervalType = 'exercise' | 'rest' | 'warmup' | 'cooldown';

export interface Interval {
  type: IntervalType;
  name: string;
  duration: number;
}
