import '@testing-library/jest-native/extend-expect';

// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// To fix "TypeError: loadedNativeFonts.forEach is not a function." error when importing @expo/vector-icons
jest.mock('expo-font');

// To fix " TypeError: Invalid attempt to destructure non-iterable instance. In order to be iterable, non-array objects must have a [Symbol.iterator]() method."
jest.mock('expo-av', () => {
  return {
    Audio: {
      Sound: {
        createAsync: jest.fn().mockResolvedValue({}),
      },
    },
  };
});
