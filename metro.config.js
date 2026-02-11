const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require("nativewind/metro");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    // // 나중에 MediaPipe 모델 파일을 인식하기 위해 tflite 확장자를 미리 추가합니다.
    // assetExts: [...getDefaultConfig(__dirname).resolver.assetExts, 'tflite'],
  },
});

module.exports = withNativeWind(config, { input: "./global.css" });