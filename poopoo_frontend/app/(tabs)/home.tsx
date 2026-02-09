import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
const API_BASE = process.env.EXPO_PUBLIC_API_URL!;

type Recipe = {
  id: string;
  userId: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  preparationTimeMinutes: number;
  cookingTimeMinutes: number;
  cuisineType: string;
  mealType: string;
  servings: number;
  dietaryRestrictions: string[];
};

export default function HomePlaceholder() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await SecureStore.getItemAsync("auth_token");
        if (!token) {
          throw new Error("Not authenticated");
        }
        console.log(token);
        const res = await fetch(`${API_BASE}/api/recipes/generate`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: "{}",
        });
       

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch recipes");
        }
        const data: Recipe[] = await res.json();
        setRecipes(data);

        console.log("Recipes:", data);
      } catch (err: any) {
        console.error("Get recipes error:", err);
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16 }}>
      <Text>Home screen...</Text>

      <Pressable
        onPress={getRecipes}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12,
          backgroundColor: "#4f46e5",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          {loading ? "Loading..." : "Get Recipes"}
        </Text>
      </Pressable>

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      {recipes.length > 0 && (
        <Text>{`Loaded ${recipes.length} recipes`}</Text>
      )}
    </View>
  );
}
