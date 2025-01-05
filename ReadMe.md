# ReactNativeVisionCameraApp

This is a simple React Native application using Expo and `react-native-vision-camera` to scan QR codes and barcodes.<br>
It displays the scanned code in an alert dialog and allows the user to toggle the camera on and off.

## Features

- QR and EAN-13 barcode scanning.
- Camera permission request handling.
- Display scanned code in an alert.
- Toggle camera on/off.

## Installation

To run this project locally, follow the steps below.

### 1. Clone the repository:

```bash
git clone https://github.com/WAKU-TAKE-A/ReactNativeVisionCameraApp.git
cd ReactNativeVisionCameraApp
```

### 2. Install dependencies:

Make sure you have Node.js installed. Then, install the dependencies using:

```bash
yarn install
```

### 3. Configure the build settings.

```bash
eas build:configure
```

### 4. Start the Expo development server:

```bash
npx expo prebuild
eas build --profile development --platform android
```

Install the created APK on the device.

```bash
npx expo start
```

Scan the QR code with the camera and access the URL.

If the installation of the Android SDK fails during the process, try using the official Android SDK installer.

I run `choco install android-sdk`.