module.exports = {
    preset: 'jest-expo',
    transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/__tests__/setup.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1'
    },
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/.expo/'
    ],
    collectCoverageFrom: [
      'app/**/*.{ts,tsx}',
      'components/**/*.{ts,tsx}',
      'hooks/**/*.{ts,tsx}',
      'services/**/*.{ts,tsx}',
      '!**/*.d.ts',
      '!**/node_modules/**'
    ]
  };