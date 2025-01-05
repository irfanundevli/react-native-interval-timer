import { act, renderHook } from '@testing-library/react-native';
import { useCountdown } from './useCountdown';

jest.useFakeTimers();

const SECOND = 1000;
const MINUTE = 60 * 1000;

describe('useCountdown', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  const advanceTimersByTime = (timeInMillis: number) => {
    act(() => {
      jest.advanceTimersByTime(timeInMillis);
    });
  };

  it('decreases time by 1 every second', () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    advanceTimersByTime(1 * SECOND);
    expect(result.current.formattedTime).toEqual('00:59');

    advanceTimersByTime(1 * SECOND);
    expect(result.current.formattedTime).toEqual('00:58');
  });

  it('stops the countdown', () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    advanceTimersByTime(1 * SECOND);
    act(() => {
      result.current.stop();
    });

    advanceTimersByTime(2 * SECOND);
    expect(result.current.formattedTime).toEqual('00:59');
  });

  it('resets the countdown', () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));
    advanceTimersByTime(1 * SECOND);
    act(() => {
      result.current.stop();
    });

    act(() => {
      result.current.reset();
    });
    advanceTimersByTime(2 * SECOND);

    expect(result.current.formattedTime).toEqual('01:00');
  });

  it('restarts the countdown with a new time', () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));
    advanceTimersByTime(1 * SECOND);
    expect(result.current.formattedTime).toEqual('00:59');

    act(() => {
      result.current.restart(2 * MINUTE);
    });
    advanceTimersByTime(2 * SECOND);

    expect(result.current.formattedTime).toEqual('01:58');
  });

  it('sets state as RUNNING initially', () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    advanceTimersByTime(500);
    expect(result.current.state).toEqual('RUNNING');
  });

  it('sets state as NOT-STARTED when reset function is called', () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    act(() => {
      result.current.reset();
    });

    expect(result.current.state).toEqual('NOT-STARTED');
  });

  it('sets state as RUNNING when start function is called', () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    act(() => {
      result.current.start();
    });

    expect(result.current.state).toEqual('RUNNING');
  });

  it('sets state as STOPPED when stop function is called', () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    act(() => {
      result.current.stop();
    });

    expect(result.current.state).toEqual('STOPPED');
  });

  it('returns isFinished as true when the countdown reaches zero', () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));
    act(() => {
      result.current.start();
    });

    expect(result.current.isFinished).toBeFalsy();
    advanceTimersByTime(1 * MINUTE);

    expect(result.current.isFinished).toBeTruthy();
  });
});
