import { act, fireEvent, render, screen } from "@testing-library/react-native";
import IntervalTimer from "./IntervalTimer";

jest.useFakeTimers();

const SECOND = 1000;

describe("Interval Timer Component", () => {
  const advanceTimersByTime = (timeInMillis: number) => {
    act(() => {
      jest.advanceTimersByTime(timeInMillis);
    });
  };

  it("displays current interval countdown", () => {
    render(<IntervalTimer />);

    fireEvent.press(screen.getByTestId("play"));
    advanceTimersByTime(2 * SECOND);

    expect(screen.getByText("00:58")).toBeOnTheScreen();
  });
});
