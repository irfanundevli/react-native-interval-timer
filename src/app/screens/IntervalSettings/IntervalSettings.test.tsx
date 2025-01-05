import React from 'react';
import { fireEvent, render, screen, within, act, waitFor } from '@testing-library/react-native';
import IntervalSettings from './IntervalSettings';
import { readIntervalSettings, storeIntervalSettings } from '@/store';

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  storeIntervalSettings: jest.fn(),
  readIntervalSettings: jest.fn().mockResolvedValue({
    exerciseDuration: { minutes: 1, seconds: 0 },
    restDuration: { minutes: 1, seconds: 0 },
    repeat: 1,
  }),
}));

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

describe('Interval Settings', () => {
  it('displays screen title', async () => {
    render(<IntervalSettings />);

    await waitFor(() => expect(screen.getByText('Quick routine')).toBeVisible());
  });

  describe('Intervals', () => {
    it('displays intervals title', async () => {
      render(<IntervalSettings />);

      await waitFor(() => expect(screen.getByText('INTERVALS')).toBeVisible());
    });

    describe('exercise interval', () => {
      it('displays exercise interval setting', async () => {
        render(<IntervalSettings />);

        const exercise = await screen.findByTestId('exercise');
        expect(within(exercise).getByText('Exercise')).toBeVisible();
      });

      it('stores exercise duration when apply button is pressed on duration picker modal', async () => {
        render(<IntervalSettings />);

        const exercise = screen.getByTestId('exercise');
        await act(async () => {
          fireEvent.press(within(exercise).getByText('01:00'));
        });

        expect(screen.getByTestId('durationPickerModalTitle')).toHaveTextContent('Exercise');
        fireEvent.press(screen.getByText('Apply'));

        expect(storeIntervalSettings).toHaveBeenCalledWith(
          expect.objectContaining({ exerciseDuration: { minutes: 1, seconds: 0 } }),
        );
      });

      it('displays the exercise duration fetched from storage', async () => {
        (readIntervalSettings as jest.Mock).mockResolvedValue({
          exerciseDuration: { minutes: 2, seconds: 30 },
          restDuration: { minutes: 1, seconds: 0 },
        });

        render(<IntervalSettings />);

        const exercise = await screen.findByTestId('exercise');
        expect(within(exercise).getByText('02:30')).toBeVisible();
      });
    });

    describe('rest interval', () => {
      it('displays rest interval setting', async () => {
        render(<IntervalSettings />);

        const rest = await screen.findByTestId('rest');
        expect(within(rest).getByText('Rest')).toBeVisible();
      });

      it('stores rest duration when apply button is pressed on duration picker modal', async () => {
        (readIntervalSettings as jest.Mock).mockResolvedValue({
          exerciseDuration: { minutes: 2, seconds: 30 },
          restDuration: { minutes: 0, seconds: 45 },
        });
        render(<IntervalSettings />);

        const rest = await screen.findByTestId('rest');
        await act(async () => {
          fireEvent.press(within(rest).getByText('00:45'));
        });

        expect(screen.getByTestId('durationPickerModalTitle')).toHaveTextContent('Rest');
        fireEvent.press(screen.getByText('Apply'));

        expect(storeIntervalSettings).toHaveBeenCalledWith(
          expect.objectContaining({ restDuration: { minutes: 0, seconds: 45 } }),
        );
      });

      it('displays the rest duration fetched from storage', async () => {
        (readIntervalSettings as jest.Mock).mockResolvedValue({
          exerciseDuration: { minutes: 2, seconds: 30 },
          restDuration: { minutes: 1, seconds: 30 },
        });

        render(<IntervalSettings />);

        const rest = await screen.findByTestId('rest');
        expect(within(rest).getByText('01:30')).toBeVisible();
      });
    });

    describe('repeat', () => {
      it('displays repeat setting', async () => {
        render(<IntervalSettings />);

        const repeat = await screen.findByTestId('repeat');
        expect(within(repeat).getByText('Repeat')).toBeVisible();
      });

      it('stores repeat duration when apply button is pressed on number picker modal', async () => {
        (readIntervalSettings as jest.Mock).mockResolvedValue({
          exerciseDuration: { minutes: 2, seconds: 30 },
          restDuration: { minutes: 1, seconds: 30 },
          repeat: 2,
        });
        render(<IntervalSettings />);

        const repeat = await screen.findByTestId('repeat');
        await act(async () => {
          fireEvent.press(within(repeat).getByText('x2'));
        });

        expect(screen.getByTestId('numberPickerModalTitle')).toHaveTextContent('Repeat');
        fireEvent.press(screen.getByText('Apply'));

        expect(storeIntervalSettings).toHaveBeenCalledWith(expect.objectContaining({ repeat: 2 }));
      });

      it('displays the repeat duration fetched from storage', async () => {
        (readIntervalSettings as jest.Mock).mockResolvedValue({
          exerciseDuration: { minutes: 2, seconds: 30 },
          restDuration: { minutes: 1, seconds: 30 },
          repeat: 3,
        });

        render(<IntervalSettings />);

        const repeat = await screen.findByTestId('repeat');
        expect(within(repeat).getByText('x3')).toBeVisible();
      });
    });
  });

  describe('Rounds', () => {
    it('displays rounds title', async () => {
      render(<IntervalSettings />);

      await waitFor(() => expect(screen.getByText('ROUNDS')).toBeVisible());
    });

    it('displays number of rounds setting', async () => {
      render(<IntervalSettings />);

      const rounds = await screen.findByTestId('rounds');
      expect(within(rounds).getByText('Number of Rounds')).toBeVisible();
    });

    it('stores number of rounds when apply button is pressed on number picker modal', async () => {
      (readIntervalSettings as jest.Mock).mockResolvedValue({
        exerciseDuration: { minutes: 2, seconds: 30 },
        restDuration: { minutes: 1, seconds: 30 },
        repeat: 3,
        rounds: 4,
      });
      render(<IntervalSettings />);

      const rounds = await screen.findByTestId('rounds');
      await act(async () => {
        fireEvent.press(within(rounds).getByText('x4'));
      });

      expect(screen.getByTestId('numberPickerModalTitle')).toHaveTextContent('Number of Rounds');
      fireEvent.press(screen.getByText('Apply'));

      expect(storeIntervalSettings).toHaveBeenCalledWith(expect.objectContaining({ rounds: 4 }));
    });

    it('displays the number of rounds fetched from storage', async () => {
      (readIntervalSettings as jest.Mock).mockResolvedValue({
        exerciseDuration: { minutes: 2, seconds: 30 },
        restDuration: { minutes: 1, seconds: 30 },
        repeat: 3,
        rounds: 5,
      });

      render(<IntervalSettings />);

      const rounds = await screen.findByTestId('rounds');
      expect(within(rounds).getByText('x5')).toBeVisible();
    });
  });

  describe('Start', () => {
    it('displays start button', async () => {
      render(<IntervalSettings />);

      const startButton = await screen.findByTestId('startButton');
      expect(within(startButton).getByText('Start routine')).toBeVisible();
    });

    it('navigates to the timer screen when start button is pressed', async () => {
      render(<IntervalSettings />);

      fireEvent.press(await screen.findByTestId('startButton'));

      expect(mockedNavigate).toHaveBeenNthCalledWith(1, 'IntervalTimer');
    });

    it('contains total interval duration', async () => {
      (readIntervalSettings as jest.Mock).mockResolvedValue({
        exerciseDuration: { minutes: 1, seconds: 10 },
        restDuration: { minutes: 0, seconds: 20 },
        repeat: 3,
        rounds: 3,
      });
      render(<IntervalSettings />);

      const startButton = await screen.findByTestId('startButton');
      expect(within(startButton).getByText('13:30')).toBeVisible();
    });
  });
});
