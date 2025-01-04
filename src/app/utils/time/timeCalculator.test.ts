import { sumTotalTime, type Time } from './timeCalculator';

describe('timeCalculator', () => {
  describe('sumTotalTime', () => {
    it('returns the correct total time for multiple intervals', () => {
      const intervals = [
        { hours: 1, minutes: 30, seconds: 45 },
        { minutes: 20, seconds: 30 },
        { minutes: 10, seconds: 15 },
      ];
      expect(sumTotalTime(intervals)).toBe('02:01:30');
    });

    it('returns the correct total time when hours are not provided', () => {
      const intervals = [
        { minutes: 45, seconds: 30 },
        { minutes: 20, seconds: 30 },
      ];
      expect(sumTotalTime(intervals)).toBe('01:06:00');
    });

    it('returns the correct total time when only seconds are provided', () => {
      const intervals = [
        { minutes: 0, seconds: 45 },
        { minutes: 0, seconds: 30 },
      ];
      expect(sumTotalTime(intervals)).toBe('01:15');
    });

    it('returns the correct total time when intervals are empty', () => {
      const intervals: Time[] = [];
      expect(sumTotalTime(intervals)).toBe('00:00');
    });

    it('returns the correct total time when intervals have zero values', () => {
      const intervals = [
        { hours: 0, minutes: 0, seconds: 0 },
        { minutes: 0, seconds: 0 },
      ];
      expect(sumTotalTime(intervals)).toBe('00:00');
    });

    it('returns the correct total time with a multiplier', () => {
      const intervals = [
        { hours: 1, minutes: 30, seconds: 45 },
        { minutes: 20, seconds: 30 },
        { minutes: 10, seconds: 15 },
      ];
      expect(sumTotalTime(intervals, 2)).toBe('04:03:00');
    });

    it('returns the correct total time with a multiplier when hours are not provided', () => {
      const intervals = [
        { minutes: 45, seconds: 30 },
        { minutes: 20, seconds: 30 },
      ];
      expect(sumTotalTime(intervals, 2)).toBe('02:12:00');
    });

    it('returns the correct total time with a multiplier when only seconds are provided', () => {
      const intervals = [
        { minutes: 0, seconds: 45 },
        { minutes: 0, seconds: 30 },
      ];
      expect(sumTotalTime(intervals, 2)).toBe('02:30');
    });

    it('returns the correct total time with a multiplier when intervals are empty', () => {
      const intervals: Time[] = [];
      expect(sumTotalTime(intervals, 2)).toBe('00:00');
    });

    it('returns the correct total time with a multiplier when intervals have zero values', () => {
      const intervals = [
        { hours: 0, minutes: 0, seconds: 0 },
        { minutes: 0, seconds: 0 },
      ];
      expect(sumTotalTime(intervals, 2)).toBe('00:00');
    });
  });
});
