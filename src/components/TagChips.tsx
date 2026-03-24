import { View, Text, Pressable, StyleSheet } from "react-native";

export interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface TagChipsProps {
  tags: Tag[];
  onRemove: (tagId: string) => void;
}

export default function TagChips({ tags, onRemove }: TagChipsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <View style={styles.container}>
      {tags.map((tag) => (
        <View
          key={tag.id}
          style={[styles.chip, { borderColor: tag.color ?? "#666" }]}
        >
          {tag.color && <View style={[styles.dot, { backgroundColor: tag.color }]} />}
          
          <Text style={styles.label}>{tag.name ?? "Unnamed"}</Text>

          <Pressable
            onPress={() => onRemove(tag.id)}
            hitSlop={8}
            style={styles.removeButton}
          >
            <Text style={styles.remove}>×</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    color: "#fff",
    fontSize: 12,
  },
  removeButton: {
    marginLeft: 4,
  },
  remove: {
    color: "#888",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 16,
  },
});

