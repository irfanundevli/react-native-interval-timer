import { act, fireEvent, render, screen, within } from '@testing-library/react-native';
import IntervalTimer from './IntervalTimer';
import { useWorkout } from './useWorkout';
import { Workout } from '@/store';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('@react-navigation/native');
jest.mock('./useWorkout');

const SECOND = 1000;

describe('Interval Timer', () => {
  const advanceTimersByTime = (timeInMillis: number) => {
    act(() => {
      jest.advanceTimersByTime(timeInMillis);
    });
  };

  const currentInterval = () => screen.getByTestId('current-interval');
  const cycles = () => screen.getByTestId('cycles');
  const nextInterval = () => screen.getByTestId('next-interval');
  const remaining = () => screen.getByTestId('remaining');
  const rounds = () => screen.getByTestId('rounds');

  const pressButton = (testID: string) => {
    act(() => {
      fireEvent.press(screen.getByTestId(testID));
    });
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('displays current interval countdown', () => {
    (useWorkout as jest.Mock).mockReturnValue(
      new Workout({
        cycles: 1,
        exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
        rest: { type: 'rest', name: 'Rest', duration: 10 * SECOND },
        roundsPerCycle: 1,
      }),
    );

    render(<IntervalTimer />);

    advanceTimersByTime(2 * SECOND);
    expect(within(currentInterval()).getByText('Exercise')).toBeOnTheScreen();
    expect(within(currentInterval()).getByText('00:58')).toBeOnTheScreen();
  });

  it('displays next interval', () => {
    (useWorkout as jest.Mock).mockReturnValue(
      new Workout({
        cycles: 1,
        exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
        rest: { type: 'rest', name: 'Rest', duration: 10 * SECOND },
        roundsPerCycle: 1,
      }),
    );

    render(<IntervalTimer />);

    expect(within(nextInterval()).getByText('Rest')).toBeOnTheScreen();
    expect(within(nextInterval()).getByText('00:10')).toBeOnTheScreen();
  });

  it('displays next interval as current interval when the current interval is finished', async () => {
    (useWorkout as jest.Mock).mockReturnValue(
      new Workout({
        cycles: 1,
        exercise: { type: 'exercise', name: 'Exercise', duration: 5 * SECOND },
        rest: { type: 'rest', name: 'Rest', duration: 2 * SECOND },
        roundsPerCycle: 1,
      }),
    );
    render(<IntervalTimer />);
    advanceTimersByTime(5 * SECOND);

    expect(await within(currentInterval()).findByText('Rest')).toBeOnTheScreen();
    expect(await within(currentInterval()).findByText('00:02')).toBeOnTheScreen();
  });

  it('displays total remaining time', async () => {
    (useWorkout as jest.Mock).mockReturnValue(
      new Workout({
        cycles: 1,
        exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
        rest: { type: 'rest', name: 'Rest', duration: 10 * SECOND },
        roundsPerCycle: 1,
      }),
    );

    render(<IntervalTimer />);
    advanceTimersByTime(5 * SECOND);

    expect(await within(remaining()).findByText('REMAINING')).toBeOnTheScreen();
    expect(await within(remaining()).findByText('01:05')).toBeOnTheScreen();
  });

  it('displays rounds ', async () => {
    (useWorkout as jest.Mock).mockReturnValue(
      new Workout({
        cycles: 1,
        exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
        rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
        roundsPerCycle: 3,
      }),
    );
    render(<IntervalTimer />);

    expect(await within(rounds()).findByText('1/3')).toBeOnTheScreen();
    expect(await within(rounds()).findByText('ROUNDS')).toBeOnTheScreen();

    advanceTimersByTime(64 * SECOND);
    expect(await within(rounds()).findByText('1/3')).toBeOnTheScreen();
    expect(await within(rounds()).findByText('ROUNDS')).toBeOnTheScreen();

    advanceTimersByTime(65 * SECOND);
    expect(await within(rounds()).findByText('2/3')).toBeOnTheScreen();
    expect(await within(rounds()).findByText('ROUNDS')).toBeOnTheScreen();
  });

  it('displays cycles ', async () => {
    (useWorkout as jest.Mock).mockReturnValue(
      new Workout({
        cycles: 1,
        exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
        rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
        roundsPerCycle: 3,
      }),
    );
    render(<IntervalTimer />);

    expect(await within(cycles()).findByText('1/1')).toBeOnTheScreen();
    expect(await within(cycles()).findByText('CYCLES')).toBeOnTheScreen();
  });

  it('is paused when the stop button is pressed', async () => {
    (useWorkout as jest.Mock).mockReturnValue(
      new Workout({
        cycles: 1,
        exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
        rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
        roundsPerCycle: 1,
      }),
    );
    render(<IntervalTimer />);
    advanceTimersByTime(7 * SECOND);

    pressButton('stop');
    advanceTimersByTime(5 * SECOND);

    const currentInterval = await screen.findByTestId('current-interval');
    expect(within(currentInterval).getByText('00:53')).toBeOnTheScreen();
  });

  it('resumes when the start button is pressed after stopping the countdown first', async () => {
    (useWorkout as jest.Mock).mockReturnValue(
      new Workout({
        cycles: 1,
        exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
        rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
        roundsPerCycle: 1,
      }),
    );
    render(<IntervalTimer />);
    advanceTimersByTime(7 * SECOND);

    pressButton('stop');
    advanceTimersByTime(5 * SECOND);
    pressButton('play');
    advanceTimersByTime(2 * SECOND);

    const currentInterval = await screen.findByTestId('current-interval');
    expect(within(currentInterval).getByText('00:51')).toBeOnTheScreen();
  });

  it('resets the timer', () => {
    (useWorkout as jest.Mock).mockReturnValue(
      new Workout({
        cycles: 2,
        exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
        rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
        roundsPerCycle: 3,
      }),
    );
    render(<IntervalTimer />);
    advanceTimersByTime(30 * SECOND);

    fireEvent.press(screen.getByTestId('reset'));

    expect(within(currentInterval()).getByText('01:00')).toBeOnTheScreen();
    expect(within(currentInterval()).getByText('Exercise')).toBeOnTheScreen();
    expect(within(nextInterval()).getByText('Rest')).toBeOnTheScreen();
    expect(within(nextInterval()).getByText('00:05')).toBeOnTheScreen();
    expect(within(rounds()).getByText('1/3')).toBeOnTheScreen();
    expect(within(cycles()).getByText('1/2')).toBeOnTheScreen();
  });

  it('navigates to the interval settings screen when the time config icon is clicked', () => {
    (useWorkout as jest.Mock).mockReturnValue(
      new Workout({
        cycles: 1,
        exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
        rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
        roundsPerCycle: 1,
      }),
    );
    render(<IntervalTimer />);

    fireEvent.press(screen.getByTestId('timer-config'));

    expect(mockedNavigate).toHaveBeenNthCalledWith(1, 'IntervalSettings');
  });
});
