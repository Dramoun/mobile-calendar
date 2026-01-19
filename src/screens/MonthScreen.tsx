import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import DateNavigator from "../components/DateNavigator";

interface MonthProps {
  date: Date;
  onDaySelect: (date: Date) => void;
  setCurrentDate: (date: Date) => void;
}

// Dummy month days
const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

// Fake events for now
const EVENTS = [
  { day: 12, title: "Project review" },
  { day: 18, title: "Dentist" },
  { day: 29, title: "Flight" },
];

// Month navigation helpers
function prevMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() - 1, 1);
}

function nextMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 1);
}

export default function MonthScreen({
  date,
  onDaySelect,
  setCurrentDate,
}: MonthProps) {
  // Compute counts
  const totalItems = EVENTS.length + 3; // fake total items
  const totalEvents = EVENTS.length; // filtered for "event" type

  return (
    <View style={styles.container}>
      {/* Top navigator */}
      <DateNavigator
        label={date.toLocaleString("default", { month: "long", year: "numeric" })}
        onPrev={() => setCurrentDate(prevMonth(date))}
        onNext={() => setCurrentDate(nextMonth(date))}
        onToday={() => setCurrentDate(new Date())}
      />

      {/* Month grid */}
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

      {/* Summary bar */}
      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>{totalItems} items</Text>

        <Pressable style={styles.filterIcon}>
          <Text style={styles.filterText}>⚡</Text>
        </Pressable>

        <Text style={styles.summaryText}>{totalEvents} events</Text>
      </View>

      {/* Scrollable list of events */}
      <ScrollView style={styles.eventList} contentContainerStyle={{ paddingBottom: 12 }}>
        {EVENTS.map((e, idx) => (
          <Pressable
            key={idx}
            style={styles.eventRow}
            onPress={() =>
              onDaySelect(new Date(date.getFullYear(), date.getMonth(), e.day))
            }
          >
            <Text style={styles.eventDate}>{e.day}</Text>
            <Text style={styles.eventTitle}>{e.title}</Text>
          </Pressable>
        ))}
      </ScrollView>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: "14.28%",
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
  summaryBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#222",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
    backgroundColor: "#1a1a1a",
  },
  summaryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  filterIcon: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#222",
    borderRadius: 4,
  },
  filterText: {
    color: "#3b82f6",
    fontSize: 12,
  },
  eventList: {
    flex: 1,
    marginTop: 4,
  },
  eventRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
  },
  eventDate: {
    color: "#3b82f6",
    fontSize: 12,
    width: 32,
  },
  eventTitle: {
    color: "#fff",
    fontSize: 12,
    flexShrink: 1,
  },
});

