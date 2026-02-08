import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { COLORS, FONTS, SIZES, UI } from "./styles";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Save({ onNext, onBack }: Props) {
  return (
    <View style={styles.container}>
      {/* Back arrow */}
      <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>

      {/* Center content */}
      <View style={styles.center}>
        <Text style={styles.title}>Save Money</Text>

        <Image
          source={require("../../assets/images/onboarding-save.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Next button */}
      <View style={styles.bottom}>
        <Pressable style={styles.pill} onPress={onNext}>
          <Text style={styles.pillText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: UI.screenPaddingX,
    paddingTop: UI.topPadding,
    paddingBottom: 28,
  },
  back: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },
  backText: {
    fontSize: 34,
    lineHeight: 34,
    color: COLORS.text,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 26,
    paddingBottom: 20,
  },
  title: {
    fontFamily: FONTS.title,
    fontSize: SIZES.title,
    color: COLORS.text,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: UI.imageHeight,
  },
  bottom: {
    alignItems: "center",
    paddingBottom: 14,
  },
  pill: {
    width: UI.pillWidth,
    height: UI.pillHeight,
    borderRadius: UI.pillRadius,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  pillText: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.white,
  },
});
