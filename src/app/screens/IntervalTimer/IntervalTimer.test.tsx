import { render, screen } from "@testing-library/react-native";
import IntervalTimer from "./IntervalTimer";

describe("Interval Timer Component", () => {
  it("displays total remaining time", () => {
    render(<IntervalTimer />);

    expect(screen.getByText("Remaining")).toBeOnTheScreen();
  });
});
