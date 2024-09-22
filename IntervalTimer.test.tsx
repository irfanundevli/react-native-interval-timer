import { render, screen } from "@testing-library/react-native";
import IntervalTimer from "./IntervalTimer";

describe("Interval Timer Component", () => {
  it("render correctly", () => {
    render(<IntervalTimer />);

    expect(screen.getByText("Interval Timer")).toBeVisible();
  });
});
