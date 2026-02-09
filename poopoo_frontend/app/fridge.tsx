import { useMemo, useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import ScreenHeader from "../components/feed/ScreenHeader";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator } from "react-native";


const COLORS = {
  protein: "#FF3B30",
  produce: "#34C759",
  dairy: "#007AFF",
  other: "#FF6E30",
};

type GroupKey = "Protein" | "Produce" | "Dairy" | "Other";

type Item = { id: string; label: string };

const INITIAL: Record<GroupKey, Item[]> = {
  Protein: [
    { id: "chicken", label: "Chicken" },
    { id: "chickpeas", label: "Chick Peas" },
  ],
  Produce: [
    { id: "apple", label: "Apple" },
    { id: "tomatoes", label: "Tomatoes" },
    { id: "onions", label: "Onions" },
  ],
  Dairy: [
    { id: "milk", label: "Milk" },
    { id: "eggs", label: "Eggs" },
  ],
  Other: [
    { id: "takeout", label: "Take-out box" },
    { id: "coke", label: "Coca-Cola" },
  ],
};

export default function MyFridge() {
  const [data, setData] = useState(INITIAL);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFridgeItems();
  }, []);

async function fetchFridgeItems() {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("auth_token");
      const API_BASE = process.env.EXPO_PUBLIC_API_URL;

      const response = await fetch(`${API_BASE}/api/items`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const items = await response.json();
        
        const grouped: Record<GroupKey, Item[]> = {
          Protein: [],
          Produce: [],
          Dairy: [],
          Other: [],
        };

        items.forEach((item: any) => {
          const cat = (item.category || "Other") as GroupKey;
          if (grouped[cat]) {
            grouped[cat].push({ id: item.id, label: item.name });
          } else {
            grouped["Other"].push({ id: item.id, label: item.name });
          }
        });

        setData(grouped);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  }

  function removeItem(group: GroupKey, id: string) {
    setData((prev) => ({
      ...prev,
      [group]: prev[group].filter((x) => x.id !== id),
    }));
  }

  // Should work?
  function onAdd() {
    router.push("/(tabs)/camera");
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

     <View style={styles.topRow}>
        <Pressable onPress={() => router.back()} style={styles.back}>
            <Text style={styles.backText}>‹</Text>
        </Pressable>
  
    <Text style={styles.title}>My fridge</Text>

    <Pressable style={styles.confirmWrap} onPress={() => router.push("/(tabs)/home" as const)}>
        <Text style={styles.confirmText}>Confirm</Text>
        <Text style={styles.chev}>›</Text>
    </Pressable>
        </View>
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={{ paddingBottom: 110 }}>
        <Group
          label="Protein"
          color={COLORS.protein}
          items={data.Protein}
          onRemove={(id) => removeItem("Protein", id)}
        />
        <Group
          label="Produce"
          color={COLORS.produce}
          items={data.Produce}
          onRemove={(id) => removeItem("Produce", id)}
        />
        <Group
          label="Dairy"
          color={COLORS.dairy}
          items={data.Dairy}
          onRemove={(id) => removeItem("Dairy", id)}
        />
        <Group
          label="Other"
          color={COLORS.other}
          items={data.Other}
          onRemove={(id) => removeItem("Other", id)}
        />
      </ScrollView>

      <Pressable onPress={onAdd} style={[styles.fab]}>
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </View>
  );
}

function Group({
  label,
  color,
  items,
  onRemove,
}: {
  label: GroupKey;
  color: string;
  items: Item[];
  onRemove: (id: string) => void;
}) {
  return (
    <View style={styles.group}>
      <View style={[styles.groupBar, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <View style={styles.groupHeader}>
          <Text style={[styles.groupTitle, { color }]}>{label}</Text>
        </View>

        <View style={styles.chipRow}>
          {items.map((it) => (
            <Chip key={it.id} label={it.label} onRemove={() => onRemove(it.id)} />
          ))}
        </View>
      </View>
    </View>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
      <Pressable onPress={onRemove} hitSlop={8} style={styles.chipXWrap}>
        <Text style={styles.chipX}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 100, paddingHorizontal: 16 },

  topRow: {
    marginTop: 6,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { 
    width: 58, 
    height: 58, 
    justifyContent: "center" 
  },
   backText: { 
    fontSize: 55, 
    lineHeight: 55,
    color: "#000",
  },
  title: { fontSize: 34, fontWeight: "800" },
  confirmWrap: { flexDirection: "row", alignItems: "center", gap: 6, paddingTop: 9 },
  confirmText: { fontSize: 18, fontWeight: "700" },
  chev: { fontSize: 24, color: "#111" },

  group: { flexDirection: "row", gap: 20, marginTop: 18 },
  groupBar: { width: 4, borderRadius: 999 },
  groupHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  groupTitle: { fontSize: 22, fontWeight: "800" },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    paddingVertical: 8,
    paddingLeft: 14,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  chipText: { fontSize: 12, fontWeight: "600" },
  chipXWrap: {
    marginLeft: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  chipX: { color: "#FF3B30", fontSize: 14, lineHeight: 14, fontWeight: "800" },

  fab: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#84BFFA",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  fabText: { color: "#fff", fontSize: 28, lineHeight: 28, fontWeight: "800" },
});
