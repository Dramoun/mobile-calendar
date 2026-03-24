import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { useState, useEffect } from "react";

import DateNavigator from "../components/DateNavigator";
import ItemOverlay from "../components/ItemOverlay";
import EditItemPanel from "../components/EditItemPanel";
import DayTimeGrid from "../components/DayTimeGrid";
import DayItemLayer from "../components/DayItemLayer";

import type { CalendarItemFormat } from "@structure-types";

import { nanoid } from "nanoid/non-secure";
import { getItemsForDay, updateCalendarItem, createCalendarItem, deleteCalendarItem } from "../storage/calendarItems";

interface DayProp {
  date: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

export default function DayScreen({ date, onPrevDay, onNextDay, onToday }: DayProp) {
  const [items, setItems] = useState<CalendarItemFormat[]>([]);
  const [activeItem, setActiveItem] = useState<CalendarItemFormat | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  function handleHourPress(hour: number) {
    const newItem: CalendarItemFormat = {
      id: nanoid(),
      title: "",
      description: "",
      startTime: `${String(hour).padStart(2, "0")}:00`,
      endTime: undefined,
      type: { id: "event", name: "Event" },
      createAt: new Date(),
      date: date,
    };
    setActiveItem(newItem);
    setOverlayVisible(true);
    console.log("Creating new item for hour", hour);
  }

  function handleItemPress(item: CalendarItemFormat) {
    setActiveItem(item);
    setOverlayVisible(true);
  }

  async function handleSave(item: CalendarItemFormat) {
    const existingIndex = items.findIndex((i) => i.id === item.id);

    if (existingIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingIndex] = item;
      setItems(updatedItems);
      await updateCalendarItem(item, item.type.id);
    } else {
      setItems([...items, item]);
      await createCalendarItem(item, item.type.id);
    }

    setOverlayVisible(false);
    setActiveItem(null);
  }

  async function handleDelete(itemId: string) {
    await deleteCalendarItem(itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    setOverlayVisible(false);
    setActiveItem(null);
  }

  function handleCancel() {
    setOverlayVisible(false);
    setActiveItem(null);
  }

  async function fetchItems() {
    const freshItems = await getItemsForDay(date.getTime());
    console.log("Fetched items for day:", freshItems);
    setItems(freshItems);
  }

  useEffect(() => {
    fetchItems();
  }, [date]);

  return (
    <View style={styles.container}>
      {activeItem && (
        <ItemOverlay visible={overlayVisible} onClose={handleCancel} header={getEditItemHeader(activeItem)}>
          <EditItemPanel
            itemData={activeItem}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </ItemOverlay>
      )}

      <DateNavigator label={date.toDateString()} onPrev={onPrevDay} onNext={onNextDay} onToday={onToday} />

      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          <DayTimeGrid onHourPress={handleHourPress} />
          <DayItemLayer items={items} onItemPress={handleItemPress} />
        </View>
      </ScrollView>

      <Pressable onPress={() => handleHourPress(9)} style={styles.addButton}>
        <Text style={styles.addText}>+ Add</Text>
      </Pressable>
    </View>
  );
}

function getEditItemHeader(itemData: CalendarItemFormat) {
  const isCreating = !itemData.title?.trim();
  return (
    <View>
      <Text style={styles.heading}>{isCreating ? "New Event" : "Edit Event"}</Text>
      <Text style={styles.subheading}>{itemData.date?.toDateString?.() ?? ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", paddingTop: 16 },
  scrollView: { flex: 1 },
  gridContainer: { position: "relative", minHeight: 24 * 60 },
  addButton: {
    alignSelf: "center",
    marginBottom: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#222",
    borderRadius: 6,
  },
  addText: { color: "#3b82f6", fontSize: 14, fontWeight: "600" },
  heading: { color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 4 },
  subheading: { color: "#888", fontSize: 12 },
});