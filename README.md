<p align="center">
  <img src="./assets/images/icon.png" alt="TraceKidV2 Logo" width="150"/>
</p>

<h1 align="center">TraceKidV2 - AI-Powered Device Tracker</h1>

<p align="center">
  TraceKidV2 is a React Native Expo project designed to provide advanced tracking capabilities for devices, leveraging the power of AI to ensure precise and reliable location monitoring.
</p>

[![Build and Release APK](https://github.com/darksky6666/tracekidv2/actions/workflows/build-apk.yml/badge.svg)](https://github.com/darksky6666/tracekidv2/actions/workflows/build-apk.yml)
[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

---

## 🔽 Download

[![Release](https://img.shields.io/github/release/darksky6666/tracekidv2.svg)](https://github.com/darksky6666/tracekidv2/releases/latest)

You can download the most recent version of Trace Kid V2 from
[here](https://github.com/darksky6666/tracekidv2/releases/latest).

---

## 🏗️ Build

1. **Navigate to project directory and install npm dependencies:**
   
   ```sh
    npm install
   ```

2. **Run prebuild and build project:**
   
   **Development:**
   ```sh
    npm run dev:android
   ```

   **Production:**
   ```sh
   npx expo prebuild --platform android
   cd android
   ./gradlew assembleRelease
   ```