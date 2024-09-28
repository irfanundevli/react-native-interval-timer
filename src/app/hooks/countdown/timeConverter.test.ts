import {millisecondsToTime, Options} from './timeConverter';

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
});
