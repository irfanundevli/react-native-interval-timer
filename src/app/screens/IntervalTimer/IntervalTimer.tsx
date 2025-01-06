import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Interval from './interval';
import { useCountdown } from './useCountdown';
import { millisecondsToTime } from '@/utils/time';
import { Divider, IconButton } from '@/ui/components';
import { Workout } from '@/store';
import { Colors } from '@/ui/styles';

interface Props {
  workout: Workout;
  onTimerConfigPress: () => void;
}

export default function IntervalTimer({ onTimerConfigPress, workout }: Props) {
  const currentInterval = workout.currentInterval;
  const nextInterval = workout.nextInterval;
  const countdown = useCountdown(currentInterval.duration);

  const resetInterval = () => {
    workout.reset();
    countdown.reset();
  };

  if (countdown.isFinished) {
    if (nextInterval) {
      workout.next();
      countdown.restart(nextInterval.duration);
    } else {
      resetInterval();
    }
  }

  const totalRemainingTime = workout.calculateTotalRemainingTime(countdown.time);

  return (
    <View style={styles.container}>
      <View style={{ rowGap: 30 }}>
        <View style={styles.reset}>
          <IconButton icon="timer-cog-outline" onPress={onTimerConfigPress} testID="timer-config" type="clean" />
          <IconButton icon="refresh" onPress={resetInterval} testID="reset" type="clean" />
        </View>
        <View style={styles.intervals}>
          <Interval
            name={currentInterval.name}
            size="2xl"
            testID="current-interval"
            time={millisecondsToTime(countdown.time)}
            type={currentInterval.type}
          />
          {nextInterval && (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                <Divider />
                <View style={{ borderWidth: 1, borderColor: Colors.WHITE, borderRadius: 6, padding: 4 }}>
                  <Text style={{ color: 'white' }}>NEXT</Text>
                </View>
                <Divider />
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}
                testID="next-interval"
              >
                <Text style={{ color: Colors.WHITE, fontWeight: '500', fontSize: 24 }}>{nextInterval.name}</Text>
                <Text style={{ color: Colors.WHITE, fontWeight: '500', fontSize: 24 }}>
                  {millisecondsToTime(nextInterval.duration)}
                </Text>
              </View>
            </>
          )}
        </View>

        <View style={[styles.status]}>
          <View testID="rounds" style={{ alignItems: 'flex-start', rowGap: 40, justifyContent: 'space-between' }}>
            <Text style={{ color: Colors.WHITE, fontWeight: '300', fontSize: 16 }}>sets</Text>
            <Text style={{ color: Colors.WHITE, fontWeight: '600', fontSize: 40, marginBottom: 10 }}>
              {workout.roundStatus}
            </Text>
          </View>

          <View testID="cycles" style={{ alignItems: 'center', rowGap: 40, justifyContent: 'space-between' }}>
            <Text style={{ color: Colors.WHITE, fontWeight: '300', fontSize: 16 }}>cycles</Text>
            <Text style={{ color: Colors.WHITE, fontWeight: '600', fontSize: 40, marginBottom: 10 }}>
              {workout.cycleStatus}
            </Text>
          </View>

          <View testID="remaining" style={{ alignItems: 'flex-end', rowGap: 40, alignContent: 'space-between' }}>
            <Text style={{ color: Colors.WHITE, fontWeight: '300', fontSize: 16 }}>remaining</Text>
            <Text
              style={{
                color: Colors.WHITE,
                fontWeight: '600',
                fontSize: 64,
              }}
            >
              {millisecondsToTime(totalRemainingTime)}
            </Text>
          </View>
        </View>
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
    height: '100%',
  },
  intervals: {
    borderColor: Colors.WHITE,
    borderWidth: 0.2,
    borderRadius: 16,
    padding: 20,
    rowGap: 16,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  reset: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginBottom: 40,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    padding: 16,
  },
  white: {
    color: 'white',
  },
});
