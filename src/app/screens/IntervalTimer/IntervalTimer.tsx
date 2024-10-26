import React from 'react';
import { View, StyleSheet } from 'react-native';
import IntervalCard from './card';
import { useCountdown } from '@/hooks/countdown';
import { Workout } from '@/store';
import { millisecondsToTime } from '@/utils/time';
import Status from './status';
import { IconButton } from '@/ui/components';

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
        <IconButton
          icon="refresh"
          onPress={() => {
            workout.reset();
            countdown.reset();
          }}
          testID="reset"
          type="clean"
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
          <IconButton icon="stop" onPress={() => countdown.stop()} testID="stop" />
        ) : (
          <IconButton icon="play" onPress={() => countdown.start()} testID="play" />
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
    padding: 6,
    width: '100%',
  },
  intervals: {
    width: '100%',
  },
  footer: {
    alignItems: 'center',
  },
  reset: {
    alignSelf: 'flex-end',
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
