import AsyncStorage from '@react-native-async-storage/async-storage';

interface Duration {
  minutes: number;
  seconds: number;
}

interface IntervalSettings {
  exerciseDuration: Duration;
  restDuration: Duration;
  repeat: number;
  rounds: number;
}

const DEFAULT_DURATION: Duration = { minutes: 1, seconds: 0 };

export const DEFAULT_INTERVAL_SETTINGS: IntervalSettings = {
  exerciseDuration: DEFAULT_DURATION,
  restDuration: DEFAULT_DURATION,
  repeat: 1,
  rounds: 1,
};

export const storeIntervalSettings = async (settings: IntervalSettings): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem('@interval_settings', jsonValue);
  } catch (e) {
    console.error('Failed to save the interval settings.', e);
  }
};

export const readIntervalSettings = async (): Promise<IntervalSettings> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@interval_settings');
    return jsonValue != null ? JSON.parse(jsonValue) : DEFAULT_INTERVAL_SETTINGS;
  } catch (e) {
    console.error('Failed to fetch the interval settings.', e);
    return DEFAULT_INTERVAL_SETTINGS;
  }
};
