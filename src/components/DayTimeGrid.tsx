import { View, Text, StyleSheet, Pressable } from "react-native";

interface DayTimeGridProps {
  onHourPress: (hour: number) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function DayTimeGrid({ onHourPress }: DayTimeGridProps) {
  return (
    <View>
      {HOURS.map((hour) => (
        <Pressable
          key={hour}
          style={styles.hourRow}
          onPress={() => onHourPress(hour)}
        >
          <Text style={styles.hourLabel}>
            {String(hour).padStart(2, "0")}:00
          </Text>
          <View style={styles.hourContent} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
