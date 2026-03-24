import { View, Text, TextInput, StyleSheet } from "react-native";

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TimeInput({
  label,
  value,
  onChange,
  placeholder = "HH:MM",
}: TimeInputProps) {
  function handleChange(text: string) {
    // Auto-format time input
    let formatted = text.replace(/[^0-9]/g, "");
    
    if (formatted.length >= 2) {
      formatted = formatted.slice(0, 2) + ":" + formatted.slice(2, 4);
    }
    
    onChange(formatted);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor="#666"
        style={styles.input}
        keyboardType="number-pad"
        maxLength={5}
        underlineColorAndroid="transparent"
        selectionColor="#3b82f6"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    borderWidth: 0,
  },
});
