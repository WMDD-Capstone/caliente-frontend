import './global.css';
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  NativeModules,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  PhotoFile,
} from 'react-native-vision-camera';

const {FaceLandmarkerModule} = NativeModules;

type BlendshapeData = Record<string, number>;

type FaceResult = {
  detected: boolean;
  landmarkCount: number;
  landmarks: Array<{index: number; x: number; y: number; z: number}>;
  blendshapes: BlendshapeData;
};

function App(): React.JSX.Element {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('front');
  const cameraRef = useRef<Camera>(null);
  const [isActive, setIsActive] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const [faceResult, setFaceResult] = useState<FaceResult | null>(null);
  const [fps, setFps] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const captureAndDetect = async () => {
    if (!cameraRef.current) return;

    try {
      const photo: PhotoFile = await cameraRef.current.takePhoto({
        qualityPrioritization: 'speed',
      });

      // Read photo as base64
      const RNFS = require('react-native-fs');
      const base64 = await RNFS.readFile(photo.path, 'base64');

      const result = await FaceLandmarkerModule.detectFace(base64);
      setFaceResult(result);
    } catch (error) {
      console.log('Detection error:', error);
    }
  };

  const startDetection = () => {
    setIsDetecting(true);
    let frameCount = 0;
    const startTime = Date.now();

    intervalRef.current = setInterval(async () => {
      await captureAndDetect();
      frameCount++;
      const elapsed = (Date.now() - startTime) / 1000;
      setFps(Math.round(frameCount / elapsed));
    }, 500); // 2fps for photo-based detection
  };

  const stopDetection = () => {
    setIsDetecting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setFps(0);
  };

  const getSmileScore = (): number => {
    if (!faceResult?.blendshapes) return 0;
    const left = faceResult.blendshapes['mouthSmileLeft'] || 0;
    const right = faceResult.blendshapes['mouthSmileRight'] || 0;
    return Math.round(((left + right) / 2) * 100);
  };

  const getEyeOpenScore = (): number => {
    if (!faceResult?.blendshapes) return 0;
    const left = faceResult.blendshapes['eyeBlinkLeft'] || 0;
    const right = faceResult.blendshapes['eyeBlinkRight'] || 0;
    return Math.round((1 - (left + right) / 2) * 100);
  };

  const getExpression = (): string => {
    const smile = getSmileScore();
    const eyeOpen = getEyeOpenScore();

    if (smile > 60) return '😊 Happy';
    if (eyeOpen < 30) return '😑 Eyes Closed';
    if (smile < 10) return '😐 Neutral';
    return '🙂 Relaxed';
  };

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.title}>📷 Camera Permission Required</Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.title}>No Front Camera Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 Caliente</Text>
        <Text style={styles.headerSubtitle}>MediaPipe Face Detection Test</Text>
      </View>

      {/* Camera */}
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          photo={true}
        />
        <View style={styles.overlay}>
          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                {backgroundColor: isDetecting ? '#4CAF50' : '#FF9800'},
              ]}
            />
            <Text style={styles.statusText}>
              {isDetecting ? `Detecting (${fps} fps)` : 'Ready'}
            </Text>
          </View>

          {faceResult?.detected && (
            <View style={styles.expressionBadge}>
              <Text style={styles.expressionText}>{getExpression()}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Results */}
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>📊 Face Detection Results</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Face Detected</Text>
          <Text
            style={[
              styles.infoValue,
              {color: faceResult?.detected ? '#4CAF50' : '#FF5252'},
            ]}>
            {faceResult?.detected ? '✅ Yes' : '❌ No'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Landmarks</Text>
          <Text style={styles.infoValue}>
            {faceResult?.landmarkCount || 0} / 468
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Smile</Text>
          <Text style={styles.infoValue}>{getSmileScore()}%</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Eyes Open</Text>
          <Text style={styles.infoValue}>{getEyeOpenScore()}%</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Blendshapes</Text>
          <Text style={styles.infoValue}>
            {Object.keys(faceResult?.blendshapes || {}).length} detected
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              {backgroundColor: isDetecting ? '#FF5252' : '#4CAF50'},
            ]}
            onPress={isDetecting ? stopDetection : startDetection}>
            <Text style={styles.controlButtonText}>
              {isDetecting ? '⏹ Stop' : '▶️ Start Detection'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#1a1a2e'},
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#16213e',
  },
  headerTitle: {fontSize: 24, fontWeight: 'bold', color: '#FF6B6B'},
  headerSubtitle: {fontSize: 14, color: '#a0a0b0', marginTop: 2},
  title: {fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10},
  button: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  cameraContainer: {
    height: 280,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  overlay: {position: 'absolute', top: 12, left: 12, right: 12},
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusDot: {width: 8, height: 8, borderRadius: 4, marginRight: 6},
  statusText: {color: '#fff', fontSize: 12, fontWeight: '600'},
  expressionBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  expressionText: {color: '#fff', fontSize: 14, fontWeight: '600'},
  infoPanel: {
    flex: 1,
    backgroundColor: '#16213e',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  infoLabel: {fontSize: 14, color: '#a0a0b0'},
  infoValue: {fontSize: 14, color: '#fff', fontWeight: '600'},
  controls: {flexDirection: 'row', gap: 12, marginTop: 16},
  controlButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  controlButtonText: {color: '#fff', fontSize: 14, fontWeight: '600'},
});

export default App;
