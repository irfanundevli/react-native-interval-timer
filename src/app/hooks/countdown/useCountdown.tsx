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

export default function useCountdown(startTimeInMillis: number): CountDown {
  const [state, setState] = useState<State>('NOT-STARTED');
  const [timeMillis, setTimeMillis] = useState(startTimeInMillis);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalId);
    setState('NOT-STARTED');
    setTimeMillis(startTimeInMillis);
  }, [startTimeInMillis]);

  const restart = useCallback((time: number) => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      setTimeMillis((prev) => (prev >= 10 ? prev - 10 : 0));
    }, 10);
    setState('RUNNING');
    setTimeMillis(time);
  }, []);

  const start = useCallback(() => {
    intervalId = setInterval(() => {
      setTimeMillis((prev) => (prev >= 10 ? prev - 10 : 0));
    }, 10);
    setState('RUNNING');
  }, []);

  const stop = useCallback(() => {
    clearInterval(intervalId);
    setState('STOPPED');
  }, []);

  return {
    isFinished: timeMillis === 0,
    reset,
    restart,
    start,
    state,
    stop,
    time: timeMillis,
    formattedTime: millisecondsToTime(timeMillis),
  };
}
