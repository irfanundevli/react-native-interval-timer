export interface Time {
  hours?: number;
  minutes: number;
  seconds: number;
}

export function sumTotalTime(intervals: Time[], multiplier: number = 1): string {
  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;

  intervals.forEach((interval) => {
    totalHours += interval.hours ?? 0;
    totalMinutes += interval.minutes;
    totalSeconds += interval.seconds;
  });

  totalSeconds = (totalHours * 3600 + totalMinutes * 60 + totalSeconds) * multiplier;

  totalHours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  totalMinutes = Math.floor(totalSeconds / 60);
  totalSeconds %= 60;

  const formattedHours = totalHours.toString().padStart(2, '0');
  const formattedMinutes = totalMinutes.toString().padStart(2, '0');
  const formattedSeconds = totalSeconds.toString().padStart(2, '0');

  if (totalHours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
}
