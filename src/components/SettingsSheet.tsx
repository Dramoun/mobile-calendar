import { Modal, View, StyleSheet, Pressable, Animated } from "react-native";
import { useEffect, useRef } from "react";
import SettingsScreen from "../screens/SettingsScreen";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SettingsSheet({ visible, onClose }: Props) {
  const translateX = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : 400,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Animated.View
          style={[
            styles.sheet,
            { transform: [{ translateX }] },
          ]}
          >
          <SettingsScreen />
        </Animated.View>
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
    height: "100%",
  },
});

