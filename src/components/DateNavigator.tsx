import { View, Text, StyleSheet, Pressable } from "react-native";

interface Props {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  onToday?: () => void;
}

export default function DateNavigator({
  label,
  onPrev,
  onNext,
  onToday,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Top row: navigation */}
      <View style={styles.navRow}>
        <Pressable onPress={onPrev} style={styles.arrow}>
          <Text style={styles.arrowText}>◀</Text>
        </Pressable>

        <Text style={styles.label}>{label}</Text>

        <Pressable onPress={onNext} style={styles.arrow}>
          <Text style={styles.arrowText}>▶</Text>
        </Pressable>
      </View>

      {/* Bottom row: today */}
      {onToday && (
        <Pressable onPress={onToday} style={styles.todayButton}>
          <Text style={styles.todayText}>Present</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    gap: 6,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    padding: 8,
  },
  arrowText: {
    color: "#fff",
    fontSize: 18,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  todayButton: {
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#222",
    borderRadius: 6,
  },
  todayText: {
    color: "#3b82f6",
    fontSize: 12,
    fontWeight: "500",
  },
});

