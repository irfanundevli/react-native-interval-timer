const ONE_SECOND_IN_MILLIS = 1000;
const ONE_MINUTE_MILLIS = 60 * ONE_SECOND_IN_MILLIS;
const ONE_HOUR_IN_MILLIS = 60 * ONE_MINUTE_MILLIS;

export interface Options {
  alwaysShowHours: boolean;
}

export const millisecondsToTime = (
  timeInMillis: number,
  options?: Options
): string => {
  const hours = format(Math.floor(timeInMillis / ONE_HOUR_IN_MILLIS) % 60);
  const minutes = format(Math.floor(timeInMillis / ONE_MINUTE_MILLIS) % 60);
  const seconds = format(Math.floor(timeInMillis / ONE_SECOND_IN_MILLIS) % 60);

  if (timeInMillis >= ONE_HOUR_IN_MILLIS || options?.alwaysShowHours) {
    return [hours, minutes, seconds].join(":");
  }

  return [minutes, seconds].join(":");
};

const format = (time: number): string => ("0" + time).slice(-2);
