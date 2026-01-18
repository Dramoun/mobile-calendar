import { View, Text, StyleSheet, Pressable } from "react-native";
import DateNavigator from "../components/DateNavigator";

interface MonthProps {
  date: Date;
  onDaySelect: (date: Date) => void;
  setCurrentDate: (date: Date) => void;
}

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

function prevMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() - 1, 1);
}

function nextMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 1);
}

export default function MonthScreen({ 
  date, 
  onDaySelect, 
  setCurrentDate 
}: MonthProps) {
  return (
    <View style={styles.container}>
      <DateNavigator
        label={date.toLocaleString("default", { month: "long", year: "numeric" })}
        onPrev={() => setCurrentDate(prevMonth(date))}
        onNext={() => setCurrentDate(nextMonth(date))}
        onToday={() => setCurrentDate(new Date())}
      />

      <View style={styles.grid}>
        {DAYS.map((day) => (
          <Pressable
            key={day}
            style={styles.cell}
            onPress={() =>
              onDaySelect(new Date(date.getFullYear(), date.getMonth(), day))
            }
          >
            <Text style={styles.dayNumber}>{day}</Text>
            <Text style={styles.count}>• 2</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  header: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: "14.28%", // 7 columns
    aspectRatio: 1,
    padding: 4,
    borderWidth: 0.5,
    borderColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  dayNumber: {
    color: "#fff",
    fontSize: 12,
  },
  count: {
    color: "#3b82f6",
    fontSize: 10,
    marginTop: 4,
  },
});

