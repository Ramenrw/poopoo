import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { COLORS, FONTS } from "../../components/onboarding/styles";  // Add this import

export default function ScreenHeader({ title }: { title: string }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.back} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  back: { 
    width: 58,        // Changed from 56 to match ScreenFrame
    height: 58,       // Changed from 56 to match ScreenFrame
    justifyContent: "center" 
  },
  backText: { 
    fontSize: 55,     // Changed from 42 to match ScreenFrame
    lineHeight: 55,   // Changed from 42 to match ScreenFrame
    color: COLORS.text,      // Add color
    fontFamily: FONTS.body,  // Add font
  },
  title: { 
    flex: 1,
    fontSize: 22, 
    fontWeight: "700",
    paddingTop: 8,
    textAlign: 'center',
  },
});