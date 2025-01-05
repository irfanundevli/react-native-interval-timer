import { fireEvent, render, screen } from '@testing-library/react-native';
import IntervalTimer from './IntervalTimerContainer';
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

describe('Interval Timer Container', () => {
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
