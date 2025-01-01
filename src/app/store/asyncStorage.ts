import AsyncStorage from '@react-native-async-storage/async-storage';

interface Duration {
  minutes: number;
  seconds: number;
}

export const storeExerciseDuration = async (time: Duration): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(time);
    await AsyncStorage.setItem('@exercise_duration', jsonValue);
  } catch (e) {
    console.error('Failed to save the exercise duration.', e);
  }
};
