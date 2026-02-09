import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import ScreenHeader from "../components/feed/ScreenHeader";

const RED = "#FFD9D9";
const YELLOW = "#FEE6C9";

export default function FridgeUpdates() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Fridge Updates" />

      <Text style={styles.sub}>You have <Text style={styles.link}>2 updates</Text> today.</Text>

      <ScrollView showsVerticalScrollIndicator contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={styles.section}>Today</Text>
        <UpdateItem color={RED} title="Orange" bold="Orange will expire today!" />
        <UpdateItem color={RED} title="Yogurt" bold="Yogurt will expire today!" />

        <Text style={styles.section}>This week</Text>
        <UpdateItem color={YELLOW} title="Cheddar cheese" bold="Cheddar cheese will expire Thursday!" />
        <UpdateItem color={YELLOW} title="Apple" bold="Apple expiry soon!" />
        <UpdateItem color={YELLOW} title="Takeout-box" bold="Take-out box expiry soon!" />
        <UpdateItem color={YELLOW} title="Prepared meal" bold="Prepared meal expiry soon!" />
      </ScrollView>
    </View>
  );
}

function UpdateItem({ color, title, bold }: { color: string; title: string; bold: string }) {
  return (
    <View style={styles.item}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSmall}>Eat or use a recipe</Text>
        <Text style={styles.itemBold}>{bold}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 16, paddingHorizontal: 16 },
  sub: { color: "#666", marginTop: 6, marginBottom: 10 },
  link: { color: "#84BFFA", fontWeight: "600" },
  section: { marginTop: 14, marginBottom: 8, color: "#999" },
  item: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  dot: { width: 42, height: 42, borderRadius: 21, marginTop: 2 },
  itemTitle: { fontWeight: "600" },
  itemSmall: { color: "#888", marginTop: 2 },
  itemBold: { marginTop: 2 },
});
