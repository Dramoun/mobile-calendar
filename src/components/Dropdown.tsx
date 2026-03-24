import { View, ScrollView, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

export interface DropdownOption {
  id: string;
  name: string;
  color?: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  multiSelect?: boolean;
  selectedId?: string;
  selectedIds?: string[];
  placeholder?: string;
  onChange: (value: string | string[]) => void;
}

export default function Dropdown({
  label,
  options,
  multiSelect = false,
  selectedId,
  selectedIds = [],
  placeholder = "Select an option",
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(prev => !prev);

  function handleSelect(optionId: string) {
    if (multiSelect) {
      const nextIds = selectedIds.includes(optionId)
        ? selectedIds.filter(id => id !== optionId)
        : [...selectedIds, optionId];

      onChange(nextIds);
    } else {
      onChange(optionId);
      setIsOpen(false);
    }
  }

  function getButtonText() {
    if (multiSelect) {
      if (!selectedIds.length) return placeholder;
      return `${selectedIds.length} selected`;
    }

    if (!selectedId) return placeholder;

    const selected = options.find(opt => opt.id === selectedId);
    return selected?.name ?? placeholder;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable onPress={toggleOpen} style={styles.button}>
        <Text style={styles.buttonText}>{getButtonText()}</Text>
        <Text style={[styles.arrow, isOpen && styles.arrowUp]}>▼</Text>
      </Pressable>

      {isOpen && (
        <View style={styles.dropdownOverlay}>
          <View style={styles.dropdown}>
            <ScrollView
              showsVerticalScrollIndicator
              nestedScrollEnabled
            >
              {options.map(option => {
                const isSelected = multiSelect
                  ? selectedIds.includes(option.id)
                  : selectedId === option.id;

                return (
                  <Pressable
                    key={option.id}
                    onPress={() => handleSelect(option.id)}
                    style={[
                      styles.dropdownItem,
                      isSelected && styles.dropdownItemSelected,
                    ]}
                  >
                    <View style={styles.itemContent}>
                      {option.color && (
                        <View
                          style={[
                            styles.colorDot,
                            { backgroundColor: option.color },
                          ]}
                        />
                      )}

                      <Text
                        style={[
                          styles.itemText,
                          isSelected && styles.itemTextSelected,
                        ]}
                      >
                        {option.name}
                      </Text>

                      {multiSelect && isSelected && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
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
  button: {
    backgroundColor: "#222",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  arrow: {
    color: "#666",
    fontSize: 10,
  },
  arrowUp: {
    transform: [{ rotate: "180deg" }],
  },
  dropdownOverlay: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  dropdown: {
    backgroundColor: "#1a1a1a",
    borderRadius: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    maxHeight: 160,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  dropdownItemSelected: {
    backgroundColor: "#252525",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  itemText: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
  },
  itemTextSelected: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  checkmark: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "bold",
  },
});

