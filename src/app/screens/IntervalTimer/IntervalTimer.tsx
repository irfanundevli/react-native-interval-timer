import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import IntervalCard from './card';
import { useCountdown } from '@/hooks/countdown';
import { Workout } from '@/store';
import { millisecondsToTime } from '@/utils/time';
import Status from './status';

interface Props {
  workout: Workout;
}

export default function IntervalTimer({ workout }: Props) {
  const currentInterval = workout.currentInterval;
  const nextInterval = workout.nextInterval;
  const countdown = useCountdown(currentInterval.duration);

  if (countdown.isFinished) {
    if (nextInterval) {
      workout.next();
      countdown.restart(nextInterval.duration);
    } else {
      countdown.stop();
    }
  }

  const totalRemainingTime = workout.calculateTotalRemainingTime(countdown.time);

  return (
    <View style={styles.container}>
      <View style={styles.reset}>
        <Button
          onPress={() => {
            workout.reset();
            countdown.reset();
          }}
          testID="reset"
          title="Reset"
        />
      </View>

      <View style={styles.intervals}>
        <IntervalCard
          name={currentInterval.name}
          size="2xl"
          testID="current-interval"
          time={millisecondsToTime(countdown.time)}
          type={currentInterval.type}
        />
        {nextInterval && (
          <IntervalCard
            name={nextInterval.name}
            size="md"
            testID="next-interval"
            time={millisecondsToTime(nextInterval.duration)}
            type={nextInterval.type}
          />
        )}
      </View>

      <View style={styles.status}>
        <Status name="ROUNDS" testID="rounds" value={workout.roundStatus} />
        <Status name="REMAINING" testID="remaining" value={millisecondsToTime(totalRemainingTime)} />
        <Status name="CYCLES" testID="cycles" value={workout.cycleStatus} />
      </View>

      <View style={styles.footer}>
        {countdown.state === 'RUNNING' ? (
          <Button title="Stop" testID="stop" onPress={() => countdown.stop()} />
        ) : (
          <Button title="Start" testID="play" onPress={() => countdown.start()} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  intervals: {
    width: '100%',
  },
  footer: {
    alignItems: 'center',
  },
  reset: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 40,
    width: '100%',
  },
  white: {
    color: 'white',
  },
});
