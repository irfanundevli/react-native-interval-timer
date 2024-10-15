import { act, fireEvent, render, screen, within } from '@testing-library/react-native';
import IntervalTimer from './IntervalTimer';
import { Workout } from '@/store';

jest.useFakeTimers();

const SECOND = 1000;

describe('Interval Timer', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  const advanceTimersByTime = (timeInMillis: number) => {
    act(() => {
      jest.advanceTimersByTime(timeInMillis);
    });
  };

  const pressButton = (testID: string) => {
    act(() => {
      fireEvent.press(screen.getByTestId(testID));
    });
  };

  it('displays current interval countdown', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      roundsPerCycle: 1,
    });
    render(<IntervalTimer workout={workout} />);

    pressButton('play');
    advanceTimersByTime(2 * SECOND);

    const currInterval = screen.getByTestId('current-interval');
    expect(within(currInterval).getByText('Exercise')).toBeOnTheScreen();
    expect(within(currInterval).getByText('00:58')).toBeOnTheScreen();
  });

  it('displays next interval', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      rest: { type: 'rest', name: 'Rest', duration: 10 * SECOND },
      roundsPerCycle: 1,
    });
    render(<IntervalTimer workout={workout} />);

    const nextInterval = screen.getByTestId('next-interval');
    expect(within(nextInterval).getByText('Rest')).toBeOnTheScreen();
    expect(within(nextInterval).getByText('00:10')).toBeOnTheScreen();
  });

  it('displays next interval as current interval when the current interval is finished', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 5 * SECOND },
      rest: { type: 'rest', name: 'Rest', duration: 2 * SECOND },
      roundsPerCycle: 1,
    });
    render(<IntervalTimer workout={workout} />);
    pressButton('play');

    advanceTimersByTime(5 * SECOND);

    const currInterval = screen.getByTestId('current-interval');
    expect(within(currInterval).getByText('Rest')).toBeOnTheScreen();
    expect(within(currInterval).getByText('00:02')).toBeOnTheScreen();
  });

  it('displays total remaining time', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      rest: { type: 'rest', name: 'Rest', duration: 10 * SECOND },
      roundsPerCycle: 1,
    });
    render(<IntervalTimer workout={workout} />);
    pressButton('play');

    advanceTimersByTime(5 * SECOND);

    const totalRemainingTimeFragment = screen.getByTestId('total-remaining-time');
    expect(within(totalRemainingTimeFragment).getByText('Remaining')).toBeOnTheScreen();
    expect(within(totalRemainingTimeFragment).getByText('01:05')).toBeOnTheScreen();
  });

  it('is paused when the stop button is pressed', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
      roundsPerCycle: 1,
    });
    render(<IntervalTimer workout={workout} />);
    pressButton('play');
    advanceTimersByTime(7 * SECOND);

    pressButton('stop');
    advanceTimersByTime(5 * SECOND);

    const currInterval = screen.getByTestId('current-interval');
    expect(within(currInterval).getByText('00:53')).toBeOnTheScreen();
  });

  it('resumes when the start button is pressed after stopping the countdown first', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
      roundsPerCycle: 1,
    });
    render(<IntervalTimer workout={workout} />);
    pressButton('play');
    advanceTimersByTime(7 * SECOND);

    pressButton('stop');
    advanceTimersByTime(5 * SECOND);
    pressButton('play');
    advanceTimersByTime(2 * SECOND);

    const currInterval = screen.getByTestId('current-interval');
    expect(within(currInterval).getByText('00:51')).toBeOnTheScreen();
  });

  it('displays remaining rounds count', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
      roundsPerCycle: 3,
    });
    render(<IntervalTimer workout={workout} />);

    pressButton('play');
    expect(screen.getByText('3 Rounds Left')).toBeOnTheScreen();

    advanceTimersByTime(64 * SECOND);
    expect(screen.getByText('3 Rounds Left')).toBeOnTheScreen();

    advanceTimersByTime(65 * SECOND);
    expect(screen.getByText('2 Rounds Left')).toBeOnTheScreen();
  });

  it('displays remaining rounds cycle', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
      roundsPerCycle: 3,
    });
    render(<IntervalTimer workout={workout} />);

    pressButton('play');
    expect(screen.getByText('3 Rounds Left')).toBeOnTheScreen();

    advanceTimersByTime(64 * SECOND);
    expect(screen.getByText('3 Rounds Left')).toBeOnTheScreen();

    advanceTimersByTime(65 * SECOND);
    expect(screen.getByText('2 Rounds Left')).toBeOnTheScreen();
  });
});
