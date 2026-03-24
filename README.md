# CalendarAppExpo

A personal calendar app built with **React Native + Expo**, using **SQLite** for local storage.  

This app is for personal use, allowing you to track events, tasks, notes, and reminders. It supports tags, different calendar item types, and local notifications.

---

## **Features**

- Create, update calendar items (events, notes, tasks) (delete in the future) 
- Assign tags and types to items  (adding custom tags and types in the future)
- Local reminders stored in SQLite  (feature not implemented yet)
- Data persists across app updates  
- Fully offline and works without Expo Go when built locally  

---

## **Getting Started**

### Prerequisites

- Node.js 18+  
- npm or yarn  
- Expo CLI (local) installed via your project: `npx expo`  
- Android Studio (for local builds)  
- USB debugging enabled on your Android device if testing locally  

---

### **Install dependencies**

```bash
npm install
# or
yarn install
````

---

### **Running in development**

```bash
npx expo start
```

* Open in Expo Go on your device or emulator for testing
* The app uses `expo-sqlite` for local storage

---

### **Local Android Build**

The `android/` folder is **not committed to GitHub**. To build locally on a new system:

1. Generate the native Android folder:

```bash
npx expo prebuild --platform android
```

2. Build via terminal:

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

3. Build APK:

   * Output will be in `android/app/build/outputs/apk/debug/app-debug.apk`

4. Install on your device:

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

> ⚠️ Note: SQLite data persists across `adb install -r` installs. Only schema-breaking migrations can affect old data.

---
### **SQLite & Data Safety**

* All data is stored locally in `calendar.db` inside the app sandbox
* Updates to the app preserve existing SQLite DB
* Schema migrations handle database changes safely

---

### **Notes**

* The app is for personal use and not published to app stores
* Keep your local `.env*.local` files for secrets / configs
* Use `npx expo prebuild` to regenerate native folders on new systems
* For patch updates, `adb install -r` is safe and preserves existing data
