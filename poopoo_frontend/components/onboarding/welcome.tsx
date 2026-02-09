import { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { COLORS, FONTS } from "./styles";

interface Props {
  onFinish?: () => void; // optional
}

export default function Welcome({ onFinish }: Props) {
  useEffect(() => {
    const t = setTimeout(() => {
      // Prefer routing to feed for dev preview:
      router.replace("/(tabs)/home");
      // If you want onboarding flow instead later:
      // onFinish?.();
    }, 900);

    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to{"\n"}
        <Text style={styles.brand}>Motto</Text>
      </Text>

      <Image
        source={require("../../assets/images/motto.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
    gap: 36,
  },
  title: {
    fontFamily: FONTS.title,
    fontSize: 32,
    color: COLORS.text,
    textAlign: "center",
  },
  brand: {
    color: COLORS.primary,
  },
  image: {
    width: 120,
    height: 160,
  },
});
