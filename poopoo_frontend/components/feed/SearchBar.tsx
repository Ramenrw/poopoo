import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View style={styles.wrap}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search..."
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16 },
  input: {
    height: 42,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
});
