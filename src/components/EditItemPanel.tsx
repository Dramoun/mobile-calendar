import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from "react-native";
import { useState, useEffect, useMemo } from "react";

import { CalendarItemFormat, CalendarItemType, TagType } from "@structure-types";

import { getAllTags } from "../storage/tags";
import { getAllTypes } from "../storage/types";

import Dropdown from "./Dropdown";
import ColorPicker from "./ColorPicker";
import TagChips from "./TagChips";
import TimeInput from "./TimeInput";

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
  const [title, setTitle] = useState(itemData.title ?? "");
  const [description, setDescription] = useState(itemData.description ?? "");
  const [startTime, setStartTime] = useState(itemData.startTime);
  const [endTime, setEndTime] = useState(itemData.endTime ?? "");
  const [itemColor, setItemColor] = useState(itemData.itemColor ?? "#3b82f6");

  // ID-based state
  const [typeId, setTypeId] = useState<string | undefined>(itemData.type?.id);
  const [tagIds, setTagIds] = useState<string[]>(
    itemData.tags?.map(t => t.id) ?? []
  );

  const [availableTags, setAvailableTags] = useState<TagType[]>([]);
  const [eventTypes, setEventTypes] = useState<CalendarItemType[]>([]);

  const isCreating = !itemData.title;

  useEffect(() => {
    async function loadData() {
      const types = await getAllTypes();
      const tags = await getAllTags();

      setEventTypes(types);
      setAvailableTags(tags);
    }

    loadData();
  }, []);

  // Derived values
  const selectedType = useMemo(
    () => eventTypes.find(t => t.id === typeId),
    [eventTypes, typeId]
  );

  const selectedTags = useMemo(
    () => availableTags.filter(t => tagIds.includes(t.id)),
    [availableTags, tagIds]
  );

  function handleSave() {
    if (!selectedType) return; // defensive

    const updatedItem: CalendarItemFormat = {
      ...itemData,
      title,
      description: description || undefined,
      startTime,
      endTime: endTime || undefined,
      type: selectedType,
      itemColor,
      tags: selectedTags.length ? selectedTags : undefined,
      updatedAt: new Date(),
    };

    onSave(updatedItem);
  }

  function removeTag(tagId: string) {
    setTagIds(prev => prev.filter(id => id !== tagId));
  }

  return (
    <ScrollView
      style={{ maxHeight: 500 }}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator
    >
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
        />
      </View>

      {/* Time */}
      <View style={styles.row}>
        <TimeInput
          label="Start"
          value={startTime}
          onChange={setStartTime}
        />
        <TimeInput
          label="End"
          value={endTime}
          onChange={setEndTime}
          placeholder="Optional"
        />
      </View>

      {/* Type Dropdown */}
      <Dropdown
        label="Type"
        options={eventTypes}
        selectedId={typeId}
        onChange={(id) => setTypeId(id as string)}
        placeholder="Select type"
      />

      {/* Tags Dropdown */}
      <Dropdown
        label="Tags"
        options={availableTags}
        multiSelect
        selectedIds={tagIds}
        onChange={(ids) => setTagIds(ids as string[])}
        placeholder="Select tags"
      />

      {/* Selected Tags */}
      <TagChips tags={selectedTags} onRemove={removeTag} />

      {/* Color Picker */}
      <ColorPicker
        label="Color"
        value={itemColor}
        onChange={setItemColor}
      />

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable onPress={onCancel} style={styles.button}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={handleSave}
          disabled={!title.trim() || !selectedType}
          style={styles.button}
        >
          <Text
            style={[
              styles.save,
              (!title.trim() || !selectedType) && styles.disabled,
            ]}
          >
            {isCreating ? "Create" : "Save"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 12 },
  label: { color: "#aaa", fontSize: 12, marginBottom: 4 },
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
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
  },
  button: { padding: 4 },
  cancel: { color: "#888", fontSize: 14 },
  save: {
    color: "#3b82f6",
    fontSize: 14,
    fontWeight: "600",
  },
  disabled: { color: "#555" },
});

