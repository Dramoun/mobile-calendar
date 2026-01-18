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
      <Pressable onPress={onPrev} style={styles.arrow}>
        <Text style={styles.arrowText}>◀</Text>
      </Pressable>

      <Text style={styles.label}>{label}</Text>

      <Pressable onPress={onNext} style={styles.arrow}>
        <Text style={styles.arrowText}>▶</Text>
      </Pressable>

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
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
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
    padding: 6,
    backgroundColor: "#3b82f6",
    borderRadius: 4,
  },
  todayText: {
    color: "#fff",
    fontSize: 12,
  },
});

