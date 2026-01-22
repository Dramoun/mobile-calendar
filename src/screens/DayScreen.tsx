import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { useState } from "react";
import DateNavigator from "../components/DateNavigator";
import ItemOverlay from "../components/ItemOverlay";
import EditItemPanel, { getEditItemHeader } from "../components/EditItemPanel";
import DayTimeGrid from "../components/DayTimeGrid";
import DayItemLayer from "../components/DayItemLayer";
import type { CalendarItemFormat, CalendarItemType } from "@structure-types";

interface DayProp {
  date: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday?: () => void;
}

export default function DayScreen({
  date,
  onPrevDay,
  onNextDay,
  onToday,
}: DayProp) {
  // State: items for this day
  const [items, setItems] = useState<CalendarItemFormat[]>([]);
  
  // State: what's being edited/created
  const [activeItem, setActiveItem] = useState<CalendarItemFormat | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  // Create a new item draft
  function handleHourPress(hour: number) {
    const newItem: CalendarItemFormat = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      startTime: `${String(hour).padStart(2, "0")}:00`,
      endTime: undefined,
      type: "event" as CalendarItemType,
      createAt: new Date(),
      date: date,
    };
    console.log('pressed empty'); 
    setActiveItem(newItem);
    setOverlayVisible(true);
  }

  // Edit an existing item
  function handleItemPress(item: CalendarItemFormat) {
    setActiveItem(item);
    setOverlayVisible(true);
  }

  // Save item (create or update)
  function handleSave(item: CalendarItemFormat) {
    const existingIndex = items.findIndex((i) => i.id === item.id);
    
    if (existingIndex >= 0) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[existingIndex] = item;
      setItems(updatedItems);
    } else {
      // Create new item
      setItems([...items, item]);
    }
    
    setOverlayVisible(false);
    setActiveItem(null);
  }

  // Cancel editing
  function handleCancel() {
    setOverlayVisible(false);
    setActiveItem(null);
  }

  return (
    <View style={styles.container}>
      {/* Overlay for creating/editing */}
      {activeItem && (
        <ItemOverlay
          visible={overlayVisible}
          onClose={handleCancel}
          header={getEditItemHeader(activeItem)}
        >
          <EditItemPanel
            itemData={activeItem}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </ItemOverlay>
      )}

      {/* Date navigation */}
      <DateNavigator
        label={date.toDateString()}
        onPrev={onPrevDay}
        onNext={onNextDay}
        onToday={onToday}
      />

      {/* Main content area */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {/* Layer 1: Time grid (pressable hours) */}
          <DayTimeGrid onHourPress={handleHourPress} />
          
          {/* Layer 2: Item blocks (floating above grid) */}
          <DayItemLayer items={items} onItemPress={handleItemPress} />
        </View>
      </ScrollView>

      {/* Quick add button */}
      <Pressable
        onPress={() => handleHourPress(9)}
        style={styles.addButton}
      >
        <Text style={styles.addText}>＋ Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 48,
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    position: "relative",
    minHeight: 24 * 60, // 24 hours * 60px per hour
  },
  addButton: {
    alignSelf: "center",
    marginBottom: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#222",
    borderRadius: 6,
  },
  addText: {
    color: "#3b82f6",
    fontSize: 14,
    fontWeight: "600",
  },
});
