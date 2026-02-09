import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS } from "./styles";

interface Props {
  onFinish: () => void; // keep for later even if screen is tap-only
}

export default function Welcome({}: Props) {
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
