import { millisecondsToTime, timeToString, timeToMilliseconds, Options } from './timeConverter';

describe('Time Converter', () => {
  describe('millisecondsToTime', () => {
    it('converts milliseconds to time string', () => {
      expect(millisecondsToTime(60 * 60 * 1000)).toEqual('01:00:00');

      expect(millisecondsToTime(1000)).toEqual('00:01');

      expect(millisecondsToTime(1000 * 60)).toEqual('01:00');
    });

    it('converts milliseconds to time string with hour if given input is great equal than one hour', () => {
      expect(millisecondsToTime(60 * 60 * 1000)).toEqual('01:00:00');
    });

    it('converts milliseconds to time string with hour if show always hours option is set to true', () => {
      const options: Options = {
        alwaysShowHours: true,
      };

      const timeInString = millisecondsToTime(60 * 1000 + 2000, options);

      expect(timeInString).toEqual('00:01:02');
    });
  });

  describe('Time Converter', () => {
    describe('millisecondsToTime', () => {
      it('converts milliseconds to time string', () => {
        expect(millisecondsToTime(60 * 60 * 1000)).toEqual('01:00:00');
        expect(millisecondsToTime(1000)).toEqual('00:01');
        expect(millisecondsToTime(1000 * 60)).toEqual('01:00');
      });

      it('converts milliseconds to time string with hour if given input is great equal than one hour', () => {
        expect(millisecondsToTime(60 * 60 * 1000)).toEqual('01:00:00');
      });

      it('converts milliseconds to time string with hour if show always hours option is set to true', () => {
        const options: Options = {
          alwaysShowHours: true,
        };

        const timeInString = millisecondsToTime(60 * 1000 + 2000, options);

        expect(timeInString).toEqual('00:01:02');
      });
    });

    describe('timeToString', () => {
      it('converts time to time string', () => {
        expect(timeToString({ minutes: 1, seconds: 0 })).toEqual('01:00');
        expect(timeToString({ seconds: 1 })).toEqual('00:01');
      });

      it('returns 00:00 if no time is provided', () => {
        expect(timeToString({})).toEqual('00:00');
      });

      it('returns 00:00 if only minutes and seconds are provided', () => {
        expect(timeToString({ minutes: 0, seconds: 0 })).toEqual('00:00');
      });

      it('formats single digit time values with leading zeros', () => {
        expect(timeToString({ minutes: 1, seconds: 1 })).toEqual('01:01');
      });
    });

    describe('timeToMilliseconds', () => {
      it('converts time object to milliseconds', () => {
        expect(timeToMilliseconds({ hours: 1, minutes: 0, seconds: 0 })).toEqual(3600000);
        expect(timeToMilliseconds({ minutes: 1, seconds: 0 })).toEqual(60000);
        expect(timeToMilliseconds({ seconds: 1 })).toEqual(1000);
      });

      it('returns 0 if no time is provided', () => {
        expect(timeToMilliseconds({})).toEqual(0);
      });

      it('converts time object with only hours to milliseconds', () => {
        expect(timeToMilliseconds({ hours: 1 })).toEqual(3600000);
      });

      it('converts time object with only minutes to milliseconds', () => {
        expect(timeToMilliseconds({ minutes: 1 })).toEqual(60000);
      });

      it('converts time object with only seconds to milliseconds', () => {
        expect(timeToMilliseconds({ seconds: 1 })).toEqual(1000);
      });

      it('converts time object with hours, minutes, and seconds to milliseconds', () => {
        expect(timeToMilliseconds({ hours: 1, minutes: 1, seconds: 1 })).toEqual(3661000);
      });
    });
  });
});
