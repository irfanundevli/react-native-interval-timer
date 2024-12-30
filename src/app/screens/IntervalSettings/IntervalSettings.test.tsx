import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react-native';
import IntervalSettings from './IntervalSettings';

describe.only('Interval Settings', () => {
  it('displays screen title', () => {
    render(<IntervalSettings />);

    expect(screen.getByText('Quick routine')).toBeVisible();
  });

  describe('Intervals', () => {
    it('displays intervals section', () => {
      render(<IntervalSettings />);

      expect(screen.getByText('INTERVALS')).toBeVisible();
    });

    it('displays exercise interval', () => {
      render(<IntervalSettings />);

      const exercise = screen.getByTestId('exercise');
      expect(within(exercise).getByText('Exercise')).toBeVisible();
      expect(within(exercise).getByText('01:00')).toBeVisible();
    });

    it('displays exercise duration picker when the time is pressed', () => {
      render(<IntervalSettings />);

      const exercise = screen.getByTestId('exercise');
      fireEvent.press(within(exercise).getByText('01:00'));
      expect(screen.getByTestId('durationPicker')).toBeVisible();
    });

    it('displays rest interval', () => {
      render(<IntervalSettings />);

      const rest = screen.getByTestId('rest');
      expect(within(rest).getByText('Rest')).toBeVisible();
      expect(within(rest).getByText('00:10')).toBeVisible();
    });

    it('displays repeat interval', () => {
      render(<IntervalSettings />);

      const repeat = screen.getByTestId('repeat');
      expect(within(repeat).getByText('Repeat')).toBeVisible();
      expect(within(repeat).getByText('x2')).toBeVisible();
    });
  });

  describe('Rounds', () => {
    it('displays rounds section', () => {
      render(<IntervalSettings />);

      expect(screen.getByText('ROUNDS')).toBeVisible();
    });

    it('displays number of rounds', () => {
      render(<IntervalSettings />);

      const rounds = screen.getByTestId('rounds');
      expect(within(rounds).getByText('Number of Rounds')).toBeVisible();
      expect(within(rounds).getByText('x2')).toBeVisible();
    });
  });
});
