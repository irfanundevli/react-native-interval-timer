import { act, fireEvent, render, screen } from "@testing-library/react-native";
import IntervalTimer from "./IntervalTimer";
import { getIntervals } from "@/store";

jest.mock("@/store");
jest.useFakeTimers();

const SECOND = 1000;

describe("Interval Timer Component", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  const advanceTimersByTime = (timeInMillis: number) => {
    act(() => {
      jest.advanceTimersByTime(timeInMillis);
    });
  };

  it("displays current interval countdown", () => {
    (getIntervals as jest.Mock).mockReturnValue([
      { type: "exercise", name: "Exercise", duration: 60 * SECOND },
    ]);
    render(<IntervalTimer />);

    fireEvent.press(screen.getByTestId("play"));
    advanceTimersByTime(2 * SECOND);

    expect(screen.getByText("00:58")).toBeOnTheScreen();
  });

  it("displays next interval", () => {
    (getIntervals as jest.Mock).mockReturnValue([
      { type: "exercise", name: "Exercise", duration: 60 * SECOND },
      { type: "rest", name: "Rest", duration: 10 * SECOND },
    ]);

    render(<IntervalTimer />);

    expect(screen.getByText("Rest")).toBeOnTheScreen();
    expect(screen.getByText("00:10")).toBeOnTheScreen();
  });
});
