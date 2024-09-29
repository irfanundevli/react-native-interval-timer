export type IntervalType = "exercise" | "rest" | "warmup" | "cooldown";

interface Interval {
  type: IntervalType;
  name: string;
  duration: number;
}

export function getIntervals(): Interval[] {
  return [
    {
      type: "exercise",
      name: "Exercise",
      duration: 60 * 1000,
    },
    {
      type: "rest",
      name: "Rest",
      duration: 5 * 1000,
    },
  ];
}
