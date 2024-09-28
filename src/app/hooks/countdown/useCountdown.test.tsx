import { act, renderHook } from "@testing-library/react-native";
import useCountdown from "./useCountdown";

jest.useFakeTimers();

const SECOND = 1000;
const MINUTE = 60 * 1000;

describe("useCountdown", () => {
  const advanceTimersByTime = (timeInMillis: number) => {
    act(() => {
      jest.advanceTimersByTime(timeInMillis);
    });
  };

  it("decreases time by 1 every second", () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    act(() => {
      result.current.start();
    });

    advanceTimersByTime(1 * SECOND);
    expect(result.current.time).toEqual("00:59");

    advanceTimersByTime(1 * SECOND);
    expect(result.current.time).toEqual("00:58");
  });

  it("stops the countdown", () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    act(() => {
      result.current.start();
    });

    advanceTimersByTime(1 * SECOND);
    act(() => {
      result.current.stop();
    });

    advanceTimersByTime(2 * SECOND);
    expect(result.current.time).toEqual("00:59");
  });

  it("resumes the countdown", () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));
    act(() => {
      result.current.start();
    });
    advanceTimersByTime(1 * SECOND);
    act(() => {
      result.current.stop();
    });

    act(() => {
      result.current.resume();
    });
    advanceTimersByTime(2 * SECOND);

    expect(result.current.time).toEqual("00:57");
  });

  it("resets the countdown", () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));
    act(() => {
      result.current.start();
    });
    advanceTimersByTime(1 * SECOND);
    act(() => {
      result.current.stop();
    });

    act(() => {
      result.current.reset();
    });
    advanceTimersByTime(2 * SECOND);

    expect(result.current.time).toEqual("01:00");
  });

  it("sets state as NOT-STARTED initially", () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    expect(result.current.state).toEqual("NOT-STARTED");
  });

  it("sets state as NOT-STARTED when reset function is called", () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    act(() => {
      result.current.reset();
    });

    expect(result.current.state).toEqual("NOT-STARTED");
  });

  it("sets state as RUNNING when start function is called", () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    act(() => {
      result.current.start();
    });

    expect(result.current.state).toEqual("RUNNING");
  });

  it("sets state as RUNNING when resume function is called", () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    act(() => {
      result.current.resume();
    });

    expect(result.current.state).toEqual("RUNNING");
  });

  it("sets state as STOPPED when stop function is called", () => {
    const { result } = renderHook(() => useCountdown(1 * MINUTE));

    act(() => {
      result.current.stop();
    });

    expect(result.current.state).toEqual("STOPPED");
  });
});
