jest.mock('react-native-vision-camera', () => ({
  Camera: 'Camera',
  useCameraDevice: jest.fn(() => ({id: 'front'})),
  useCameraPermission: jest.fn(() => ({
    hasPermission: true,
    requestPermission: jest.fn(),
  })),
}));

jest.mock('react-native-fs', () => ({
  readFile: jest.fn(),
}));
