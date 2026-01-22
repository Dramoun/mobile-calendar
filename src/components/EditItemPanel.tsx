import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { CalendarItemFormat, CalendarItemType } from "@structure-types";

interface EditItemProps {
  itemData: CalendarItemFormat;
  onCancel: () => void;
  onSave: (item: CalendarItemFormat) => void;
}

export default function EditItemPanel({
  itemData,
  onCancel,
  onSave,
}: EditItemProps) {
  const [title, setTitle] = useState(itemData.title);
  const [description, setDescription] = useState(itemData.description || "");
  const [startTime, setStartTime] = useState(itemData.startTime);
  const [endTime, setEndTime] = useState(itemData.endTime || "");
  const [type, setType] = useState(itemData.type);
  const [itemColor, setItemColor] = useState(itemData.itemColor || "#3b82f6");

  const isCreating = !itemData.title;

  function handleSave() {
    const updatedItem: CalendarItemFormat = {
      ...itemData,
      title,
      description: description || undefined,
      startTime,
      endTime: endTime || undefined,
      type: type as CalendarItemType,
      itemColor,
      updatedAt: new Date(),
    };
    
    onSave(updatedItem);
  }

  return (
    <View>
      {/* Title */}
      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Event title"
          placeholderTextColor="#666"
          style={styles.input}
        />
      </View>

      {/* Description */}
      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Add details (optional)"
          placeholderTextColor="#666"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Time */}
      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>Start</Text>
          <TextInput
            value={startTime}
            onChangeText={setStartTime}
            placeholder="HH:MM"
            placeholderTextColor="#666"
            style={styles.input}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>End</Text>
          <TextInput
            value={endTime}
            onChangeText={setEndTime}
            placeholder="Optional"
            placeholderTextColor="#666"
            style={styles.input}
          />
        </View>
      </View>

      {/* Type (temporary text input) */}
      <View style={styles.field}>
        <Text style={styles.label}>Type</Text>
        <TextInput
          value={type}
          onChangeText={setType}
          placeholder="event or note"
          placeholderTextColor="#666"
          style={styles.input}
        />
      </View>

      {/* Color picker (temporary text input) */}
      <View style={styles.field}>
        <Text style={styles.label}>Color</Text>
        <View style={styles.colorRow}>
          <TextInput
            value={itemColor}
            onChangeText={setItemColor}
            placeholder="#3b82f6"
            placeholderTextColor="#666"
            style={[styles.input, styles.colorInput]}
          />
          <View style={[styles.colorPreview, { backgroundColor: itemColor }]} />
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable onPress={onCancel} style={styles.button}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
        <Pressable onPress={handleSave} disabled={!title.trim()} style={styles.button}>
          <Text style={[styles.save, !title.trim() && styles.disabled]}>
            {isCreating ? "Create" : "Save"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// Add this function to get the header content
export function getEditItemHeader(itemData: CalendarItemFormat) {
  const isCreating = !itemData.title;
  return (
    <View>
      <Text style={styles.heading}>
        {isCreating ? "New Event" : "Edit Event"}
      </Text>
      <Text style={styles.subheading}>
        {itemData.date.toDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  subheading: {
    color: "#888",
    fontSize: 12,
  },
  field: {
    marginBottom: 12,
    flex: 1,
  },
  label: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#222",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#fff",
    fontSize: 14,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  colorInput: {
    flex: 1,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#333",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    padding: 4,
  },
  cancel: {
    color: "#888",
    fontSize: 14,
  },
  save: {
    color: "#3b82f6",
    fontSize: 14,
    fontWeight: "600",
  },
  disabled: {
    color: "#555",
  },
});
