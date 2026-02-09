import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { COLORS, FONTS, SIZES, UI } from "./styles";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Health({ onNext, onBack }: Props) {
  return (
    <View style={styles.container}>
      {/* Top-left back arrow */}
      <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>

      {/* Center content */}
      <View style={styles.center}>
        <Text style={styles.title}>Stay Healthy</Text>

        <Image
          source={require("../../assets/images/onboarding-health.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Bottom pill button */}
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
    paddingBottom: 50,
  },
  back: { 
    width: 58, 
    height: 58, 
    justifyContent: "center" 
},
  backPlaceholder: { 
    width: 58, 
    height: 58  
},
  backText: {
     fontSize: 55, 
     lineHeight: 55, 
     color: COLORS.text 
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
