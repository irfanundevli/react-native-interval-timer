import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Divider, DurationPickerModal, NumberPickerModal, Button } from '@/ui/components';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { timeToString } from '@/utils/time';
import { readIntervalSettings, storeIntervalSettings, Workout } from '@/store';
import { useNavigation } from '@react-navigation/native';
import { timeToMilliseconds, sumTotalTime } from '@/utils/time';

interface IntervalDuration {
  minutes: number;
  seconds: number;
}

export default function IntervalSettings() {
  const [exerciseDuration, setExerciseDuration] = useState<IntervalDuration>({ minutes: 1, seconds: 0 });
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [restDuration, setRestDuration] = useState<IntervalDuration>({ minutes: 1, seconds: 0 });
  const [showRestDurationPicker, setShowRestDurationPicker] = useState(false);
  const [repeat, setRepeat] = useState(1);
  const [showRepeatPicker, setShowRepeatPicker] = useState(false);
  const [rounds, setRounds] = useState(1);
  const [showRoundsPicker, setShowRoundsPicker] = useState(false);
  const navigation = useNavigation();

  const toggleDurationPickerModal = useCallback(() => {
    setShowDurationPicker(!showDurationPicker);
  }, [showDurationPicker]);

  const handleIntervalDurationChange = useCallback(
    (duration: IntervalDuration) => {
      setExerciseDuration(duration);
      storeIntervalSettings({ exerciseDuration: duration, restDuration, repeat, rounds });
    },
    [restDuration, repeat, rounds],
  );

  const toggleRestDurationPickerModal = useCallback(() => {
    setShowRestDurationPicker(!showRestDurationPicker);
  }, [showRestDurationPicker]);

  const handleRestDurationChange = useCallback(
    (duration: IntervalDuration) => {
      setRestDuration(duration);
      storeIntervalSettings({ exerciseDuration, restDuration: duration, repeat, rounds });
    },
    [exerciseDuration, repeat, rounds],
  );

  const toggleRepeatPickerModal = useCallback(() => {
    setShowRepeatPicker(!showRepeatPicker);
  }, [showRepeatPicker]);

  const handleRepeatChange = useCallback(
    (value: number) => {
      setRepeat(value);
      storeIntervalSettings({ exerciseDuration, restDuration, repeat: value, rounds });
    },
    [exerciseDuration, restDuration, rounds],
  );

  const toggleRoundsPickerModal = useCallback(() => {
    setShowRoundsPicker(!showRoundsPicker);
  }, [showRoundsPicker]);

  const handleRoundsChange = useCallback(
    (value: number) => {
      setRounds(value);
      storeIntervalSettings({ exerciseDuration, restDuration, repeat, rounds: value });
    },
    [exerciseDuration, restDuration, repeat],
  );

  useEffect(() => {
    async function readIntervalSettingsFromStorage() {
      const { exerciseDuration, restDuration, repeat, rounds } = await readIntervalSettings();
      setExerciseDuration(exerciseDuration);
      setRestDuration(restDuration);
      setRepeat(repeat);
      setRounds(rounds);
    }

    readIntervalSettingsFromStorage();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Quick routine</Text>

        <View style={styles.intervalsContainer}>
          <Text style={styles.intervalsTitle}>INTERVALS</Text>

          <View style={styles.intervals}>
            <>
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

              <DurationPickerModal
                initialDuration={exerciseDuration}
                onApply={handleIntervalDurationChange}
                title="Exercise"
                toggleVisibility={toggleDurationPickerModal}
                visible={showDurationPicker}
              />
            </>

            <Divider color="#9A9DA6" />

            <View style={styles.interval} testID="rest">
              <>
                <View style={styles.intervalMetaData}>
                  <MaterialCommunityIcons name="meditation" size={36} color="black" />
                  <Text style={styles.intervalName}>Rest</Text>
                </View>

                <TouchableHighlight onPress={toggleRestDurationPickerModal}>
                  <View style={styles.timeContainer}>
                    <Text style={styles.time}>{timeToString(restDuration)}</Text>
                  </View>
                </TouchableHighlight>

                <DurationPickerModal
                  initialDuration={restDuration}
                  onApply={handleRestDurationChange}
                  title="Rest"
                  toggleVisibility={toggleRestDurationPickerModal}
                  visible={showRestDurationPicker}
                />
              </>
            </View>
          </View>

          <View style={styles.repeatContainer}>
            <>
              <View style={styles.interval} testID="repeat">
                <View style={styles.intervalMetaData}>
                  <Ionicons name="repeat-outline" size={36} color="black" />
                  <Text style={styles.intervalName}>Repeat</Text>
                </View>

                <TouchableHighlight onPress={toggleRepeatPickerModal}>
                  <View style={styles.timeContainer}>
                    <Text style={styles.time}>x{repeat}</Text>
                  </View>
                </TouchableHighlight>
              </View>

              <NumberPickerModal
                initialValue={repeat}
                onApply={handleRepeatChange}
                title="Repeat"
                toggleVisibility={toggleRepeatPickerModal}
                visible={showRepeatPicker}
              />
            </>
          </View>
        </View>

        <View style={styles.roundsContainer}>
          <Text style={styles.intervalsTitle}>ROUNDS</Text>

          <View style={styles.repeatContainer} testID="rounds">
            <View style={styles.interval}>
              <Text style={styles.intervalName}>Number of Rounds</Text>

              <TouchableHighlight onPress={toggleRoundsPickerModal}>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>x{rounds}</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

          <NumberPickerModal
            initialValue={rounds}
            onApply={handleRoundsChange}
            title="Number of Rounds"
            toggleVisibility={toggleRoundsPickerModal}
            visible={showRoundsPicker}
          />
        </View>

        <Button
          style={styles.startButton}
          onPress={() =>
            navigation.navigate('IntervalTimer', {
              workout: new Workout({
                cycles: rounds,
                exercise: { name: 'exercise', type: 'exercise', duration: timeToMilliseconds(exerciseDuration) },
                rest: { name: 'rest', type: 'rest', duration: timeToMilliseconds(restDuration) },
                roundsPerCycle: repeat,
              }),
            })
          }
          testID="startButton"
        >
          <Text style={styles.startButtonText}>Start routine</Text>
          <Text style={styles.startButtonText}>{sumTotalTime([exerciseDuration, restDuration], repeat * rounds)}</Text>
        </Button>
      </View>
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
