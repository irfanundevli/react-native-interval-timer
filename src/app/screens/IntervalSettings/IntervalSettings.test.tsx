import React from 'react';
import { fireEvent, render, screen, within, act, waitFor } from '@testing-library/react-native';
import IntervalSettings from './IntervalSettings';
import { readExerciseDuration, storeExerciseDuration } from '@/store';

jest.mock('@/store', () => ({
  storeExerciseDuration: jest.fn(),
  readExerciseDuration: jest.fn(),
}));

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

      it('stores exercise duration after picking a new duration from the duration picker', async () => {
        render(<IntervalSettings />);

        const exercise = screen.getByTestId('exercise');
        await act(async () => {
          fireEvent.press(within(exercise).getByText('01:00'));
        });

        fireEvent.press(screen.getByText('Apply'));

        expect(storeExerciseDuration).toHaveBeenCalledWith(expect.objectContaining({ minutes: 1, seconds: 0 }));
      });

      it('displays the exercise duration fetched from storage', async () => {
        (readExerciseDuration as jest.Mock).mockResolvedValueOnce({ minutes: 2, seconds: 30 });

        render(<IntervalSettings />);

        const exercise = await screen.findByTestId('exercise');
        expect(within(exercise).getByText('02:30')).toBeVisible();
      });
    });

    it('displays rest interval', async () => {
      render(<IntervalSettings />);

      const rest = await screen.findByTestId('rest');
      expect(within(rest).getByText('Rest')).toBeVisible();
      expect(within(rest).getByText('00:10')).toBeVisible();
    });

    it('displays repeat interval', async () => {
      render(<IntervalSettings />);

      const repeat = await screen.findByTestId('repeat');
      expect(within(repeat).getByText('Repeat')).toBeVisible();
      expect(within(repeat).getByText('x2')).toBeVisible();
    });
  });

  describe('Rounds', () => {
    it('displays rounds section', async () => {
      render(<IntervalSettings />);

      await waitFor(() => expect(screen.getByText('ROUNDS')).toBeVisible());
    });

    it('displays number of rounds', async () => {
      render(<IntervalSettings />);

      const rounds = await screen.findByTestId('rounds');
      expect(within(rounds).getByText('Number of Rounds')).toBeVisible();
      expect(within(rounds).getByText('x2')).toBeVisible();
    });
  });
});
