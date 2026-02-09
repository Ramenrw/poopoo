import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, UI } from "./styles";

interface Props {
  label?: string;
  disabled?: boolean;
  onPress: () => void;
}

export default function NextPill({ label = "Next", disabled, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.pill, disabled && styles.disabled]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    width: UI.pillWidth,
    height: UI.pillHeight,
    borderRadius: UI.pillRadius,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: { opacity: 0.4 },
  text: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.white,
  },
});
