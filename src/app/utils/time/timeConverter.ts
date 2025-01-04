const ONE_SECOND_IN_MILLIS = 1000;
const ONE_MINUTE_MILLIS = 60 * ONE_SECOND_IN_MILLIS;
const ONE_HOUR_IN_MILLIS = 60 * ONE_MINUTE_MILLIS;

export interface Options {
  alwaysShowHours: boolean;
}

interface Time {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

/**
 * Converts a given time in milliseconds to a formatted time string.
 *
 * @param {number} timeInMillis - The time duration in milliseconds.
 * @param {Options} [options] - Optional settings for formatting.
 * @param {boolean} [options.alwaysShowHours] - If true, always include hours in the output string.
 * @returns {string} - The formatted time string in "HH:MM:SS" or "MM:SS" format.
 */
export const millisecondsToTime = (timeInMillis: number, options?: Options): string => {
  const hours = format(Math.floor(timeInMillis / ONE_HOUR_IN_MILLIS) % 60);
  const minutes = format(Math.floor(timeInMillis / ONE_MINUTE_MILLIS) % 60);
  const seconds = format(Math.floor(timeInMillis / ONE_SECOND_IN_MILLIS) % 60);

  if (timeInMillis >= ONE_HOUR_IN_MILLIS || options?.alwaysShowHours) {
    return [hours, minutes, seconds].join(':');
  }

  return [minutes, seconds].join(':');
};

const format = (time: number): string => ('0' + time).slice(-2);

/**
 * Converts a Time object to a string representation.
 *
 * @param {Time} time - The time object to convert. It may contain minutes, and seconds.
 * @returns {string} The formatted time string. The format will be "MM:SS".
 */
export const timeToString = (time: Time): string => {
  if (!time) {
    return '00:00';
  }

  const minutes = time.minutes !== undefined ? format(time.minutes) : '00';
  const seconds = time.seconds !== undefined ? format(time.seconds) : '00';

  return [minutes, seconds].join(':');
};

/**
 * Converts a Time object to milliseconds.
 *
 * @param {Time} time - The time object to convert. It may contain hours, minutes, and seconds.
 * @returns {number} The time in milliseconds.
 */
export const timeToMilliseconds = (time: Time): number => {
  const hoursInMillis = (time.hours ?? 0) * ONE_HOUR_IN_MILLIS;
  const minutesInMillis = (time.minutes ?? 0) * ONE_MINUTE_MILLIS;
  const secondsInMillis = (time.seconds ?? 0) * ONE_SECOND_IN_MILLIS;

  return hoursInMillis + minutesInMillis + secondsInMillis;
};
