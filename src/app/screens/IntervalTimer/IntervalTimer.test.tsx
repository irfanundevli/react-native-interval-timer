import {
  act,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react-native";
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

    const currInterval = screen.getByTestId("current-interval");
    expect(within(currInterval).getByText("Exercise")).toBeOnTheScreen();
    expect(within(currInterval).getByText("00:58")).toBeOnTheScreen();
  });

  it("displays next interval", () => {
    (getIntervals as jest.Mock).mockReturnValue([
      { type: "exercise", name: "Exercise", duration: 60 * SECOND },
      { type: "rest", name: "Rest", duration: 10 * SECOND },
    ]);

    render(<IntervalTimer />);

    const nextInterval = screen.getByTestId("next-interval");
    expect(within(nextInterval).getByText("Rest")).toBeOnTheScreen();
    expect(within(nextInterval).getByText("00:10")).toBeOnTheScreen();
  });

  it("displays next interval within current interval section when the current interval is finished", () => {
    (getIntervals as jest.Mock).mockReturnValue([
      { type: "exercise", name: "Exercise", duration: 5 * SECOND },
      { type: "rest", name: "Rest", duration: 2 * SECOND },
    ]);
    render(<IntervalTimer />);
    act(() => {
      fireEvent.press(screen.getByTestId("play"));
    });

    advanceTimersByTime(5 * SECOND);

    const currInterval = screen.getByTestId("current-interval");
    expect(within(currInterval).getByText("Rest")).toBeOnTheScreen();
    expect(within(currInterval).getByText("00:02")).toBeOnTheScreen();
  });
});
