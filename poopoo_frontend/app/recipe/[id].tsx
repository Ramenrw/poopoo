import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView, StyleSheet, Pressable, Image } from "react-native";


export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.topRow}>
          <Pressable style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <Ionicons name="heart-outline" size={24} color="#000" />
        </View>

        <Text style={styles.title}>Italian Garlic Sautéed Chicken with Rice</Text>

        <Image
            source={require("../../assets/images/feed/recipe1-hero.png")}
            style={styles.heroImg}
            resizeMode="cover"
        />

        <View style={styles.badges}>
          <View style={styles.badge}><Text>Preparation time:</Text><Text style={styles.badgeBold}>10 minutes</Text></View>
          <View style={styles.badge}><Text>Cooking time:</Text><Text style={styles.badgeBold}>10 minutes</Text></View>
        </View>

        <Text style={styles.h2}>Ingredients</Text>
        <Text style={styles.text}>Chicken breast{"\n"}Rice{"\n"}Garlic{"\n"}Salt{"\n"}Pepper{"\n"}Cooking oil</Text>

        <Text style={styles.h2}>Instructions</Text>
        <Text style={styles.text}>
          1. Rinse the rice and boil it in salted water until tender, then drain{"\n\n"}
          2. While the rice is cooking, cut the chicken breast into bite-sized pieces{"\n\n"}
          3. Peel and thinly slice the garlic cloves{"\n\n"}
          4. Heat cooking oil in a skillet over medium heat{"\n\n"}
          5. Add the sliced garlic to the oil and cook for 1 minute until fragrant{"\n\n"}
          6. Increase the heat to medium-high and add the chicken pieces{"\n\n"}
          7. Season the chicken generously with salt and pepper{"\n\n"}
          8. Sauté the chicken for 7-10 minutes until golden brown and cooked through{"\n\n"}
          9. Serve the sautéed garlic chicken over the bed of rice{"\n\n"}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 16, paddingHorizontal: 16 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  back: { width: 56, height: 56, justifyContent: "center" },
  backText: { fontSize: 42, lineHeight: 42 },
  title: { fontSize: 30, fontWeight: "700", lineHeight: 34, marginTop: 8 },
  heroImg: { width: "100%", height: 220, borderRadius: 16, marginTop: 12 },
  badges: { flexDirection: "row", gap: 12, marginTop: 12 },
  badge: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#84BFFA",
    padding: 10,
    gap: 4,
  },
  badgeBold: { fontWeight: "700" },
  h2: { marginTop: 16, fontSize: 18, fontWeight: "700" },
  text: { marginTop: 6, color: "#333" },
});
