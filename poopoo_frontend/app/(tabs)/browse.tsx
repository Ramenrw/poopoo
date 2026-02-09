import { useMemo, useState } from "react";
import { router } from "expo-router";
import { CATEGORIES, RECIPES, Category } from "../../components/feed/data";
import SearchBar from "../../components/feed/SearchBar";
import CategoryTabs from "../../components/feed/CategoryTabs";
import RecipeCardRow from "../../components/feed/RecipeCardRow";
import { View, ScrollView, Image, StyleSheet, Pressable, Text } from "react-native";


export default function Browse() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Mains");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => r.category === category)
      .filter((r) => (q ? r.title.toLowerCase().includes(q) : true));
  }, [query, category]);

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChange={setQuery} />

      {/* Banner images - tight spacing */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.bannerScroll}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <Image source={require("../../assets/images/feed/browse-1.png")} style={styles.banner} />
        <Image source={require("../../assets/images/feed/browse-2.png")} style={styles.banner} />
        <Image source={require("../../assets/images/feed/browse-3.png")} style={styles.banner} />
      </ScrollView>

      <CategoryTabs categories={CATEGORIES} active={category} onChange={setCategory} />

      <ScrollView
        style={styles.recipeScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {filtered.map((r) => (
          <Pressable key={r.id} onPress={() => router.push({ pathname: "/recipe/[id]", params: { id: r.id } })}>
            <RecipeCardRow title={r.title} thumbnail={r.thumbnail} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    paddingTop: 60
  },
  bannerScroll: {
    marginTop: 12,
    flexGrow: 0,  // Important: prevents extra space
  },
  banner: {
    width: 160,
    height: 100,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: "#EEE",
  },
  recipeScroll: {
    flex: 1,
    marginTop: 12,
  }
});