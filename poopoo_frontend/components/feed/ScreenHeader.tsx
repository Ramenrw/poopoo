import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function ScreenHeader({ title }: { title: string }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 56 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  back: { width: 56, height: 56, justifyContent: "center" },
  backText: { fontSize: 42, lineHeight: 42 },
  title: { fontSize: 22, fontWeight: "700" },
});
