import { ScrollView, Pressable, Text, StyleSheet, View } from "react-native";

export default function CategoryTabs<T extends string>({
  categories,
  active,
  onChange,
}: {
  categories: T[];
  active: T;
  onChange: (c: T) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator style={{ marginTop: 10 }}>
      <View style={{ width: 16 }} />
      {categories.map((c) => {
        const selected = c === active;
        return (
          <Pressable
            key={c}
            onPress={() => onChange(c)}
            style={[styles.tab, selected && styles.active]}
          >
            <Text style={[styles.text, selected && styles.textActive]}>{c}</Text>
          </Pressable>
        );
      })}
      <View style={{ width: 16 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  active: { backgroundColor: "#84BFFA", borderColor: "#84BFFA" },
  text: { fontSize: 12, color: "#000" },
  textActive: { color: "#fff", fontWeight: "600" },
});
