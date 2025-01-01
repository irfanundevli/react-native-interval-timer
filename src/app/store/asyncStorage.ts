import AsyncStorage from '@react-native-async-storage/async-storage';

interface Duration {
  minutes: number;
  seconds: number;
}

const DEFAULT_DURATION: Duration = { minutes: 1, seconds: 0 };

export const storeExerciseDuration = async (time: Duration): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(time);
    await AsyncStorage.setItem('@exercise_duration', jsonValue);
  } catch (e) {
    console.error('Failed to save the exercise duration.', e);
  }
};

export const readExerciseDuration = async (): Promise<Duration> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@exercise_duration');
    return jsonValue != null ? JSON.parse(jsonValue) : DEFAULT_DURATION;
  } catch (e) {
    console.error('Failed to fetch the exercise duration.', e);
    return DEFAULT_DURATION;
  }
};
