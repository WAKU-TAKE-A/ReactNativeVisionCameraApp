import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Button, Alert, Text } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCameraFormat, useCodeScanner } from 'react-native-vision-camera';

export default function App() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const device = useCameraDevice('back')
  const { hasPermission } = useCameraPermission()
  const cameraRef = useRef(null);
  const format = useCameraFormat(device, [
    { fps: 2 }
  ])
  const [isScanning, setIsScanning] = useState<boolean>(true); // Stop scanning after alert

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      if (!hasPermission) {
        console.log('Camera permission not allowed.');
      }
    })();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      for (const code of codes) {
        if (isScanning) {
          setIsScanning(false)        
          Alert.alert('Scanned Code', `${code.value}`, [
             {
               text: 'OK',
               onPress: () => setIsScanning(true),
             },
         ]);
        } else {
          // do nothin
        }
      }
    },
  });

  if (device == null) return <Text>Loading camera...</Text>;
  if (!hasPermission) return <Text>No camera permission</Text>;

  return (
    <View style={styles.container}>
      {isCameraActive && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={cameraRef}
          photo={true}
          video={false}
          format={format}
          codeScanner={codeScanner}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={isCameraActive ? 'STOP' : 'START'}
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
