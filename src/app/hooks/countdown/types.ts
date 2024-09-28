export type MilliSeconds = number;

export type CountDownState = "RUNNING" | "STOPPED" | "NOT-STARTED";

export interface CountDown {
  reset: () => void;
  resume: () => void;
  start: () => void;
  state: CountDownState;
  stop: () => void;
  time: string;
}
