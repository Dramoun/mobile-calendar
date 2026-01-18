import { Modal, View, StyleSheet, Pressable } from "react-native";
import SettingsScreen from "../screens/SettingsScreen";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SettingsSheet({ visible, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.sheet}>
          <SettingsScreen />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sheet: {
    width: "90%",
    backgroundColor: "#111",
  },
});

