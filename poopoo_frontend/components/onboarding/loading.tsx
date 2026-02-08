import { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS } from "./styles";

interface Props {
  onDone: () => void;
  delayMs?: number;
}

export default function Loading({ onDone, delayMs = 900 }: Props) {
  useEffect(() => {
    const id = setTimeout(onDone, delayMs);
    return () => clearTimeout(id);
  }, [onDone, delayMs]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/motto.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Motto...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  image: {
    width: 110,
    height: 150,
  },
  text: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.text,
  },
});
