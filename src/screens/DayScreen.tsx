import { View, Text, StyleSheet, ScrollView } from "react-native";
import DateNavigator from "../components/DateNavigator";

interface DayProp {
  date: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday?: () => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function DayScreen({
  date,
  onPrevDay,
  onNextDay,
  onToday
}: DayProp) {
  return (
    <View style={styles.container}>
      <DateNavigator
        label={date.toDateString()}
        onPrev={onPrevDay}
        onNext={onNextDay}
        onToday={onToday}
      />
     
      <ScrollView>
        {HOURS.map((hour) => (
          <View key={hour} style={styles.hourRow}>
            <Text style={styles.hourLabel}>
              {String(hour).padStart(2, "0")}:00
            </Text>

            <View style={styles.hourContent} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 48,
  },
  header: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  hourRow: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#222",
    paddingHorizontal: 16,
  },
  hourLabel: {
    width: 56,
    color: "#888",
    fontSize: 12,
    paddingTop: 4,
  },
  hourContent: {
    flex: 1,
  },
});

