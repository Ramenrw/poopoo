import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        <Image
            source={require("../../assets/images/feed/icon.png")}
            style={styles.avatarImg}
            resizeMode="contain"
        />
        </View>

      <Text style={styles.name}>Sharon</Text>

    <View style={styles.card}>
        <Row label="Dietary Restrictions" href="/restrictions" icon="restaurant-outline" />
        <Row label="My favourite recipes" href="/favourites" icon="heart-outline" />
        <Row label="My goals" href="/goals" icon="eye-outline" />
        <Row label="My fridge" href="/fridge" icon="document-text-outline" />
    </View>


      <Pressable style={styles.logout}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}

function Row({
  label,
  href,
  icon,
}: {
  label: string;
  href: "/restrictions" | "/fridge" | "/favourites" | "/goals";
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.row}>
        <View style={styles.rowLeft}>
          <Ionicons name={icon} size={18} color="#000" />
          <Text style={styles.rowText}>{label}</Text>
        </View>
        <Text style={styles.chev}>›</Text>
      </Pressable>
    </Link>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 170
  },
avatarWrap: {
  width: 110,
  height: 110,
  borderRadius: 55,
  borderWidth: 1,
  borderColor: "#D9D9D9",
  backgroundColor: "#FFFFFF",
  alignItems: "center",
  justifyContent: "center",
},
avatarImg: {
  width: 70,
  height: 70,
},
name: { fontSize: 22, fontWeight: "700", marginTop: 20, marginBottom: 30 },
card: {
  width: "88%",
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#D9D9D9",
  paddingVertical: 6,
  backgroundColor: "#FFFFFF",
},
row: {
  paddingVertical: 14,
  paddingHorizontal: 14,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
rowText: { fontSize: 14, color: "#000" },
chev: { fontSize: 18, color: "#999" },
logout: {
  marginTop: 50,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#84BFFA",
  paddingVertical: 10,
  paddingHorizontal: 28,
  backgroundColor: "#FFFFFF",

},
rowLeft: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
},
logoutText: { fontSize: 12, color: "#000" },
});
