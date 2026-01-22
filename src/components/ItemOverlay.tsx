import { Modal, View, StyleSheet, Pressable } from "react-native";
import { ReactNode } from "react";

interface ItemOverlayProps {
  visible: boolean;
  onClose: () => void;

  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export default function ItemOverlay({
  visible,
  onClose,
  header,
  children,
  footer,
}: ItemOverlayProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        {/* Click outside to close */}
        <Pressable style={styles.backdropPressable} onPress={onClose} />

        {/* Panel */}
        <View style={styles.panel}>
          {header && <View style={styles.header}>{header}</View>}

          <View style={styles.body}>{children}</View>

          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },

  panel: {
    width: "88%",
    maxHeight: "80%",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },

  body: {
    padding: 16,
  },

  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
  },
});

