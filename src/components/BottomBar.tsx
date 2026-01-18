import { View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  mode: "day" | "month";
  onChange: (mode: "day" | "month") => void;
};

export default function BottomBar({ mode, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onChange("day")}>
        <Text style={[styles.item, mode === "day" && styles.active]}>
          Day
        </Text>
      </Pressable>

      <Pressable onPress={() => onChange("month")}>
        <Text style={[styles.item, mode === "month" && styles.active]}>
          Month
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#111",
  },
  item: {
    color: "#888",
    fontSize: 16,
  },
  active: {
    color: "#3b82f6",
    fontWeight: "600",
  },
});

