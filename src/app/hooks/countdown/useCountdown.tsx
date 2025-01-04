import { useCallback, useEffect, useState } from 'react';
import { millisecondsToTime } from '@/utils/time';

type State = 'RUNNING' | 'STOPPED' | 'NOT-STARTED';
interface CountDown {
  formattedTime: string;
  isFinished: boolean;
  reset: () => void;
  restart: (time: number) => void;
  start: () => void;
  state: State;
  stop: () => void;
  time: number;
}

let intervalId: any;

export default function useCountdown(initialStartTimeInMillis: number): CountDown {
  const [state, setState] = useState<State>('NOT-STARTED');
  const [time, setTime] = useState(initialStartTimeInMillis);
  const [initialTime] = useState(initialStartTimeInMillis);

  const reset = useCallback(() => {
    clearInterval(intervalId);
    setState('NOT-STARTED');
    setTime(initialTime);
  }, [initialTime]);

  const restart = useCallback((time: number) => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      setTime((prev) => (prev >= 10 ? prev - 10 : 0));
    }, 10);
    setState('RUNNING');
    setTime(time);
  }, []);

  const start = useCallback(() => {
    intervalId = setInterval(() => {
      setTime((prev) => (prev >= 10 ? prev - 10 : 0));
    }, 10);
    setState('RUNNING');
  }, []);

  const stop = useCallback(() => {
    clearInterval(intervalId);
    setState('STOPPED');
  }, []);

  useEffect(() => {
    setTimeout(() => {
      start();
    }, 500);
  }, [start]);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, []);

  return {
    isFinished: time === 0,
    reset,
    restart,
    start,
    state,
    stop,
    time,
    formattedTime: millisecondsToTime(time),
  };
}
