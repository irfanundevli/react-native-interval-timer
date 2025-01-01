import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Divider, DurationPickerModal } from '@/ui/components';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { timeToString } from '@/utils/time';
import { storeExerciseDuration, readExerciseDuration } from '@/store';

interface IntervalDuration {
  minutes: number;
  seconds: number;
}

export default function IntervalSettings() {
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState<IntervalDuration>({ minutes: 1, seconds: 0 });

  const toggleDurationPickerModal = useCallback(() => {
    setShowDurationPicker(!showDurationPicker);
  }, [showDurationPicker]);

  const handleIntervalDurationChange = useCallback((duration: IntervalDuration) => {
    setExerciseDuration(duration);
    storeExerciseDuration(duration);
  }, []);

  useEffect(() => {
    async function readExerciseDurationFromStorage() {
      setExerciseDuration(await readExerciseDuration());
    }

    readExerciseDurationFromStorage();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Quick routine</Text>

        <View style={styles.intervalsContainer}>
          <Text style={styles.intervalsTitle}>INTERVALS</Text>

          <View style={styles.intervals}>
            <View style={styles.interval} testID="exercise">
              <View style={styles.intervalMetaData}>
                <MaterialCommunityIcons name="run-fast" size={36} color="black" />
                <Text style={styles.intervalName}>Exercise</Text>
              </View>

              <TouchableHighlight onPress={toggleDurationPickerModal}>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>{timeToString(exerciseDuration)}</Text>
                </View>
              </TouchableHighlight>
            </View>

            <Divider color="#9A9DA6" />

            <View style={styles.interval} testID="rest">
              <View style={styles.intervalMetaData}>
                <MaterialCommunityIcons name="meditation" size={36} color="black" />
                <Text style={styles.intervalName}>Rest</Text>
              </View>

              <View style={styles.timeContainer}>
                <Text style={styles.time}>00:10</Text>
              </View>
            </View>
          </View>

          <View style={styles.repeatContainer}>
            <View style={styles.interval} testID="repeat">
              <View style={styles.intervalMetaData}>
                <Ionicons name="repeat-outline" size={36} color="black" />
                <Text style={styles.intervalName}>Repeat</Text>
              </View>

              <View style={styles.timeContainer}>
                <Text style={styles.time}>x2</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.roundsContainer}>
          <Text style={styles.intervalsTitle}>ROUNDS</Text>

          <View style={styles.repeatContainer} testID="rounds">
            <View style={styles.interval}>
              <Text style={styles.intervalName}>Number of Rounds</Text>

              <View style={styles.timeContainer}>
                <Text style={styles.time}>x2</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.startButton}>
          <Text style={styles.startButtonText}>Start routine</Text>
          <Text style={styles.startButtonText}>2:20</Text>
        </View>
      </View>

      <DurationPickerModal
        title="Exercise"
        visible={showDurationPicker}
        toggleVisibility={toggleDurationPickerModal}
        onApply={handleIntervalDurationChange}
        initialDuration={exerciseDuration}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F3F8',
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '600',
  },
  intervalsContainer: {
    marginTop: 36,
    rowGap: 16,
  },
  intervalsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9A9DA6',
  },
  intervals: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    rowGap: 12,
  },
  interval: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  intervalMetaData: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  intervalName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeContainer: {
    backgroundColor: '#E4E4E4',
    padding: 8,
    borderRadius: 8,
    minWidth: 64,
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#03C389',
  },
  repeatContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    rowGap: 12,
  },
  roundsContainer: {
    marginTop: 32,
    rowGap: 16,
  },
  startButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});
