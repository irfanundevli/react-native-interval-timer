import { useEffect, useState } from "react";
import { millisecondsToTime } from "@/utils/time";

type State = "RUNNING" | "STOPPED" | "NOT-STARTED";
interface CountDown {
  isFinished: boolean;
  reset: () => void;
  restart: (time: number) => void;
  resume: () => void;
  start: () => void;
  state: State;
  stop: () => void;
  time: string;
}

let intervalId: any;

export default function useCountdown(startTimeInMillis: number): CountDown {
  const [state, setState] = useState<State>("NOT-STARTED");
  const [timeMillis, setTimeMillis] = useState(startTimeInMillis);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, []);

  const reset = () => {
    clearInterval(intervalId);
    setTimeMillis(startTimeInMillis);
    setState("NOT-STARTED");
  };

  const restart = (time: number) => {
    setTimeMillis(time);
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      setTimeMillis((prev) => (prev >= 10 ? prev - 10 : 0));
    }, 10);
    setState("RUNNING");
  };

  const resume = () => {
    intervalId = setInterval(() => {
      setTimeMillis((prev) => (prev >= 10 ? prev - 10 : 0));
    }, 10);
    setState("RUNNING");
  };

  const start = () => {
    intervalId = setInterval(() => {
      setTimeMillis((prev) => (prev >= 10 ? prev - 10 : 0));
    }, 10);
    setState("RUNNING");
  };

  const stop = () => {
    clearInterval(intervalId);
    setState("STOPPED");
  };

  return {
    isFinished: timeMillis === 0,
    reset,
    restart,
    resume,
    start,
    state,
    stop,
    time: millisecondsToTime(timeMillis),
  };
}
