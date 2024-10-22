module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx,js,jsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/expo-env.d.ts',
    '!**/.expo/**',
  ],
  moduleNameMapper: {
    '@/hooks/(.*)': '<rootDir>/src/app/hooks/$1',
    '@/store': '<rootDir>/src/app/store/',
    '@/ui/(.*)': '<rootDir>/src/app/ui-library/$1',
    '@/utils/(.*)': '<rootDir>/src/app/utils/$1',
  },
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
};
