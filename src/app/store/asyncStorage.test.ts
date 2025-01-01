import AsyncStorage from '@react-native-async-storage/async-storage';
import { readExerciseDuration, storeExerciseDuration } from './asyncStorage';

describe('asyncStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('storeExerciseDuration', () => {
    it('stores the exercise duration', async () => {
      const duration = { minutes: 5, seconds: 30 };

      await storeExerciseDuration(duration);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@exercise_duration', JSON.stringify(duration));
    });

    it('handles errors when storing the exercise duration', async () => {
      const duration = { minutes: 5, seconds: 30 };

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('AsyncStorage error'));

      await storeExerciseDuration(duration);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to save the exercise duration.', expect.any(Error));
    });
  });

  describe('readExerciseDuration', () => {
    it('reads the stored exercise duration', async () => {
      const duration = { minutes: 5, seconds: 30 };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(duration));

      const result = await readExerciseDuration();

      expect(result).toEqual(duration);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@exercise_duration');
    });

    it('returns default duration if no duration is stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await readExerciseDuration();

      expect(result).toEqual({ minutes: 1, seconds: 0 });
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@exercise_duration');
    });

    it('handles errors when reading the exercise duration', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('AsyncStorage error'));

      const result = await readExerciseDuration();

      expect(result).toEqual({ minutes: 1, seconds: 0 });
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch the exercise duration.', expect.any(Error));
    });
  });
});
