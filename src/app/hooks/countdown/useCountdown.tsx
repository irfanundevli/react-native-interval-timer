import { useEffect, useState } from "react";
import { millisecondsToTime } from "@/utils/time";

type SIGNAL = "START" | "STOP" | "RESET" | "RESUME";
type State = "RUNNING" | "STOPPED" | "NOT-STARTED";
interface CountDown {
  reset: () => void;
  resume: () => void;
  start: () => void;
  state: State;
  stop: () => void;
  time: string;
}

export default function useCountdown(startTimeInMillis: number): CountDown {
  const [signal, setSignal] = useState<SIGNAL | undefined>();
  const [state, setState] = useState<State>("NOT-STARTED");
  const [timeMillis, setTimeMillis] = useState(startTimeInMillis);

  useEffect(() => {
    let intervalId: any;

    switch (signal) {
      case "RESET": {
        clearInterval(intervalId);
        setTimeMillis(startTimeInMillis);
        setState("NOT-STARTED");
        break;
      }
      case "RESUME": {
        intervalId = setInterval(() => {
          setTimeMillis((prev) => (prev >= 10 ? prev - 10 : 0));
        }, 10);
        setState("RUNNING");
        break;
      }
      case "START": {
        intervalId = setInterval(() => {
          setTimeMillis((prev) => (prev >= 10 ? prev - 10 : 0));
        }, 10);
        setState("RUNNING");
        break;
      }
      case "STOP": {
        clearInterval(intervalId);
        setState("STOPPED");
        break;
      }
      default: {
        break;
      }
    }

    return () => clearInterval(intervalId);
  }, [signal, startTimeInMillis, timeMillis]);

  useEffect(() => {
    if (timeMillis <= 0) {
      setSignal("RESET");
    }
  }, [timeMillis, setSignal]);

  return {
    reset: () => setSignal("RESET"),
    resume: () => setSignal("RESUME"),
    start: () => setSignal("START"),
    state,
    stop: () => setSignal("STOP"),
    time: millisecondsToTime(timeMillis),
  };
}
