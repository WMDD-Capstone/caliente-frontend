module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
};
