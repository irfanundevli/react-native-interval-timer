import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import IntervalCard from './card/IntervalCard';
import { useCountdown } from '@/hooks/countdown';
import { Workout } from '@/store';
import { millisecondsToTime } from '@/utils/time';

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
      <View>
        <View style={styles.center} testID="total-remaining-time">
          <Text style={styles.whiteText}>Remaining</Text>
          <Text style={styles.whiteText}>{millisecondsToTime(totalRemainingTime)}</Text>
        </View>

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

      <View style={styles.footer}>
        <Text style={styles.whiteText}>{`${workout.remainingRounds} Rounds Left`}</Text>
        {countdown.state === 'RUNNING' ? (
          <Button title="Stop" testID="stop" onPress={() => countdown.stop()} />
        ) : (
          <Button title="Start" testID="play" onPress={() => countdown.start()} />
        )}
        <Text style={styles.whiteText}>{`${workout.remainingCycles} Cycles Left`}</Text>
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
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  reset: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  whiteText: {
    color: 'white',
  },
});
