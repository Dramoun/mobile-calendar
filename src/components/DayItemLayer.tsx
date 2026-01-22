import { View, StyleSheet } from "react-native";
import { CalendarItemFormat } from "@structure-types";
import DayItemBlock from "./DayItemBlock";

interface DayItemLayerProps {
  items: CalendarItemFormat[];
  onItemPress: (item: CalendarItemFormat) => void;
}

const HOUR_HEIGHT = 60;

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function calculateItemPosition(item: CalendarItemFormat) {
  const startMinutes = timeToMinutes(item.startTime);
  const endMinutes = item.endTime 
    ? timeToMinutes(item.endTime) 
    : startMinutes + 60; // Default 1 hour if no end time

  const top = (startMinutes / 60) * HOUR_HEIGHT;
  const height = ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;

  return { top, height };
}

export default function DayItemLayer({
  items,
  onItemPress,
}: DayItemLayerProps) {
  return (
    <View style={styles.layer} pointerEvents="box-none">
      {items.map((item) => {
        const { top, height } = calculateItemPosition(item);
        return (
          <DayItemBlock
            key={item.id}
            item={item}
            top={top}
            height={height}
            onPress={onItemPress}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
  },
});
