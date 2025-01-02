import AsyncStorage from '@react-native-async-storage/async-storage';
import { readIntervalSettings, storeIntervalSettings } from './asyncStorage';

describe('asyncStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('storeIntervalSettings', () => {
    it('stores the interval settings', async () => {
      const settings = {
        exerciseDuration: { minutes: 5, seconds: 30 },
        restDuration: { minutes: 2, seconds: 0 },
      };

      await storeIntervalSettings(settings);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@interval_settings', JSON.stringify(settings));
    });

    it('handles errors when storing the interval settings', async () => {
      const settings = {
        exerciseDuration: { minutes: 5, seconds: 30 },
        restDuration: { minutes: 2, seconds: 0 },
      };

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('AsyncStorage error'));

      await storeIntervalSettings(settings);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to save the interval settings.', expect.any(Error));
    });
  });

  describe('readIntervalSettings', () => {
    it('reads the stored interval settings', async () => {
      const settings = {
        exerciseDuration: { minutes: 5, seconds: 30 },
        restDuration: { minutes: 2, seconds: 0 },
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(settings));

      const result = await readIntervalSettings();

      expect(result).toEqual(settings);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@interval_settings');
    });

    it('returns default interval settings if no settings are stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await readIntervalSettings();

      expect(result).toEqual({
        exerciseDuration: { minutes: 1, seconds: 0 },
        restDuration: { minutes: 1, seconds: 0 },
      });
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@interval_settings');
    });

    it('handles errors when reading the interval settings', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('AsyncStorage error'));

      const result = await readIntervalSettings();

      expect(result).toEqual({
        exerciseDuration: { minutes: 1, seconds: 0 },
        restDuration: { minutes: 1, seconds: 0 },
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch the interval settings.', expect.any(Error));
    });
  });
});
