import { act, fireEvent, render, screen, within } from '@testing-library/react-native';
import IntervalTimer from './IntervalTimer';
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

const SECOND = 1000;
const MINUTE = 60 * SECOND;

jest.mock('@react-navigation/native');

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
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      roundsPerCycle: 1,
    });
    render(<IntervalTimer workout={workout} />);

    pressButton('play');
    advanceTimersByTime(2 * SECOND);

    expect(within(currentInterval()).getByText('Exercise')).toBeOnTheScreen();
    expect(within(currentInterval()).getByText('00:58')).toBeOnTheScreen();
  });

  it('displays next interval', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      rest: { type: 'rest', name: 'Rest', duration: 10 * SECOND },
      roundsPerCycle: 1,
    });
    render(<IntervalTimer workout={workout} />);

    expect(within(nextInterval()).getByText('Rest')).toBeOnTheScreen();
    expect(within(nextInterval()).getByText('00:10')).toBeOnTheScreen();
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

    expect(within(currentInterval()).getByText('Rest')).toBeOnTheScreen();
    expect(within(currentInterval()).getByText('00:02')).toBeOnTheScreen();
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

    expect(within(remaining()).getByText('REMAINING')).toBeOnTheScreen();
    expect(within(remaining()).getByText('01:05')).toBeOnTheScreen();
  });

  it('displays rounds ', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
      roundsPerCycle: 3,
    });
    render(<IntervalTimer workout={workout} />);

    pressButton('play');
    expect(within(rounds()).getByText('1/3')).toBeOnTheScreen();
    expect(within(rounds()).getByText('ROUNDS')).toBeOnTheScreen();

    advanceTimersByTime(64 * SECOND);
    expect(within(rounds()).getByText('1/3')).toBeOnTheScreen();
    expect(within(rounds()).getByText('ROUNDS')).toBeOnTheScreen();

    advanceTimersByTime(65 * SECOND);
    expect(within(rounds()).getByText('2/3')).toBeOnTheScreen();
    expect(within(rounds()).getByText('ROUNDS')).toBeOnTheScreen();
  });

  it('displays cycles ', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 60 * SECOND },
      rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
      roundsPerCycle: 3,
    });
    render(<IntervalTimer workout={workout} />);

    pressButton('play');

    expect(within(cycles()).getByText('1/1')).toBeOnTheScreen();
    expect(within(cycles()).getByText('CYCLES')).toBeOnTheScreen();
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

    expect(within(currentInterval()).getByText('00:53')).toBeOnTheScreen();
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

    expect(within(currentInterval()).getByText('00:51')).toBeOnTheScreen();
  });

  it('resets the timer', () => {
    const workout = new Workout({
      cycles: 2,
      exercise: { type: 'exercise', name: 'Exercise', duration: 1 * MINUTE },
      rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
      roundsPerCycle: 3,
    });
    render(<IntervalTimer workout={workout} />);
    pressButton('play');
    advanceTimersByTime(30 * SECOND);

    pressButton('reset');

    expect(within(currentInterval()).getByText('Exercise')).toBeOnTheScreen();
    expect(within(currentInterval()).getByText('01:00')).toBeOnTheScreen();
    expect(within(nextInterval()).getByText('Rest')).toBeOnTheScreen();
    expect(within(nextInterval()).getByText('00:05')).toBeOnTheScreen();
    expect(within(rounds()).getByText('1/3')).toBeOnTheScreen();
    expect(within(cycles()).getByText('1/2')).toBeOnTheScreen();
  });

  it('goes to the interval settings screen', () => {
    const workout = new Workout({
      cycles: 1,
      exercise: { type: 'exercise', name: 'Exercise', duration: 1 * MINUTE },
      rest: { type: 'rest', name: 'Rest', duration: 5 * SECOND },
      roundsPerCycle: 3,
    });
    render(<IntervalTimer workout={workout} />);

    pressButton('timer-config');

    expect(mockedNavigate).toHaveBeenNthCalledWith(1, 'IntervalSettings');
  });
});
