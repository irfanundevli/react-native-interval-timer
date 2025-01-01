import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeExerciseDuration } from './asyncStorage';

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
});
