import { Pressable, Text, StyleSheet, View } from "react-native";
import { CalendarItemFormat } from "@structure-types";

interface DayItemBlockProps {
  item: CalendarItemFormat;
  top: number;
  height: number;
  onPress: (item: CalendarItemFormat) => void;
}

export default function DayItemBlock({
  item,
  top,
  height,
  onPress,
}: DayItemBlockProps) {
  const accentColor = item.itemColor || "#3b82f6";
  
  return (
    <Pressable
      style={[
        styles.block,
        {
          top,
          height,
        },
      ]}
      onPress={() => onPress(item)}
    >
      <View style={[styles.ribbon, { backgroundColor: accentColor }]} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        {item.description && (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    position: "absolute",
    left: 72,
    right: 16,
    borderRadius: 6,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    flexDirection: "row",
    overflow: "hidden",
  },
  ribbon: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 8,
  },
  title: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  description: {
    color: "#aaa",
    fontSize: 11,
    marginTop: 2,
  },
});
