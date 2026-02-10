import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "./styles";

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function OptionPill({ label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pill, selected ? styles.pillSelected : styles.pillUnselected]}
    >
      <Text style={[styles.text, selected ? styles.textSelected : styles.textUnselected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    // subtle shadow like Figma
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  pillUnselected: {
    backgroundColor: COLORS.bg,
  },
  pillSelected: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontFamily: FONTS.body,
    fontSize: 15,
  },
  textUnselected: {
    color: COLORS.subtext,
    fontFamily: FONTS.body,
  },
  textSelected: {
    color: COLORS.white,
    fontFamily: FONTS.body,
  },
});
