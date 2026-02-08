import { useMemo, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { CATEGORIES, RECIPES, Category } from "../components/feed/data";
import SearchBar from "../components/feed/SearchBar";
import CategoryTabs from "../components/feed/CategoryTabs";
import RecipeCardRow from "../components/feed/RecipeCardRow";
import ScreenHeader from "../components/feed/ScreenHeader";

export default function Favourites() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Mains");

  // For now: pretend favourites = all recipes; later teammate wires backend.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => r.category === category)
      .filter((r) => (q ? r.title.toLowerCase().includes(q) : true));
  }, [query, category]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="My favourite recipes" />

      <SearchBar value={query} onChange={setQuery} />
      <CategoryTabs categories={CATEGORIES} active={category} onChange={setCategory} />

      <ScrollView showsVerticalScrollIndicator contentContainerStyle={{ paddingBottom: 24 }}>
        {filtered.map((r) => (
          <RecipeCardRow
            key={r.id}
            title={r.title}
            thumbnail={r.thumbnail}
            onPress={() => router.push({ pathname: "/recipe/[id]", params: { id: r.id } })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 16 },
});
