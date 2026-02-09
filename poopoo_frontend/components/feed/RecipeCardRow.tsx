import { View, Text, StyleSheet, Pressable, Image } from "react-native";

export default function RecipeCardRow({
  title,
  thumbnail,
  onPress,
}: {
  title: string;
  thumbnail?: any;
  onPress?: () => void;
}) {
  const content = (
    <View style={styles.card}>
      <View style={styles.thumb}>
        {thumbnail ? <Image source={thumbnail} style={{ width: "100%", height: "100%" }} /> : null}
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 6,
  },
  thumb: { width: 64, height: 64, borderRadius: 14, backgroundColor: "#EEE", overflow: "hidden" },
  title: { flex: 1, fontWeight: "600" },
});
