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
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.container}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 12,
    flexGrow: 0,  // Important: prevents extra space
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 10,
    backgroundColor: "#fff",
    height: 49,
  },
  active: { backgroundColor: "#84BFFA", borderColor: "#84BFFA" },
  text: { fontSize: 15, color: "#000" },
  textActive: { color: "#fff", fontWeight: "600" },
});