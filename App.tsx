import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

export default function App() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const device = useCameraDevice('back')
  const { hasPermission } = useCameraPermission()
  const cameraRef = useRef(null);

  useEffect(() => {
    // カメラの権限をリクエスト
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      
      // CameraPermissionRequestResult を確認
      if (!hasPermission) {
        console.log('カメラの権限が許可されていません');
      }
    })();
  }, []);

  if (device == null) return null; // デバイスがロードされるまで待機

  return (
    <View style={styles.container}>
      {isCameraActive && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={cameraRef}
          photo={true} // 静止画キャプチャを有効
          video={false}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={isCameraActive ? 'ストップ' : 'スタート'}
          onPress={() => setIsCameraActive(!isCameraActive)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});
