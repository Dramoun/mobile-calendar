import { View, StyleSheet } from "react-native";
import { useState } from "react";

import TopBar from "./src/components/TopBar";
import BottomBar from "./src/components/BottomBar";
import SettingsSheet from "./src/components/SettingsSheet";

import DayScreen from "./src/screens/DayScreen";
import MonthScreen from "./src/screens/MonthScreen";

type ViewMode = "day" | "month";

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  function onPrevDay() {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  }

  function onNextDay() {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  }

  function onToday() {
    setCurrentDate(new Date());
  }

  return (
    <View style={styles.root}>
      {/* Top */}
      <TopBar onOpenSettings={() => setSettingsOpen(true)} />

      {/* Middle */}
      <View style={styles.content}>
        {viewMode === "day" && 
          <DayScreen 
            date={currentDate}
            onPrevDay={onPrevDay}
            onNextDay={onNextDay}
            onToday={onToday}
          />}
        {viewMode === "month" && 
          <MonthScreen 
            date={currentDate} 
            onDaySelect={(day) => {
              setCurrentDate(day);
              setViewMode("day");
            }}
            setCurrentDate={setCurrentDate}
            />}
      </View>

      {/* Bottom */}
      <BottomBar mode={viewMode} onChange={setViewMode} />

      {/* Overlay */}
      <SettingsSheet
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
  },
});

