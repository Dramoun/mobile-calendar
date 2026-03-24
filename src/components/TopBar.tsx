import { View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  onOpenSettings: () => void;
};

export default function TopBar({ onOpenSettings }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>

      <Pressable onPress={onOpenSettings}>
        <Text style={styles.icon}>⚙</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  icon: {
    color: "#fff",
    fontSize: 20,
  },
});

