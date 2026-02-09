import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
    Inter_400Regular,
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
