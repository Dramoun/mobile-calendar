import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
}

const PRESET_COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Green
  "#ef4444", // Red
  "#f59e0b", // Orange
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f97316", // Deep Orange
];

export default function ColorPicker({ label = "Color", value, onChange }: ColorPickerProps) {
  const [showPresets, setShowPresets] = useState(false);

  function handlePresetSelect(color: string) {
    onChange(color);
    setShowPresets(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <View style={styles.mainRow}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="#3b82f6"
          placeholderTextColor="#666"
          style={styles.input}
          underlineColorAndroid="transparent"
          selectionColor="#3b82f6"
        />
        
        <Pressable
          onPress={() => setShowPresets(!showPresets)}
          style={[styles.preview, { backgroundColor: value }]}
        >
          <Text style={styles.previewText}>+</Text>
        </Pressable>
      </View>

      {showPresets && (
        <View style={styles.presetContainer}>
          {PRESET_COLORS.map((color) => (
            <Pressable
              key={color}
              onPress={() => handlePresetSelect(color)}
              style={[
                styles.presetColor,
                { backgroundColor: color },
                value === color && styles.presetColorSelected,
              ]}
            >
              {value === color && (
                <Text style={styles.selectedCheck}>✓</Text>
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 4,
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#fff",
    fontSize: 14,
    borderWidth: 0,
  },
  preview: {
    width: 40,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },
  previewText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  presetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
    padding: 8,
    backgroundColor: "#1a1a1a",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  presetColor: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },
  presetColorSelected: {
    borderColor: "#666",
  },
  selectedCheck: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
