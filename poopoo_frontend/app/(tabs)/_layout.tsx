import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const PRIMARY = "#84BFFA";
const INACTIVE = "#000000";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Poppins_600SemiBold,
  });
    if (!fontsLoaded) {
        return null;
    }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: INACTIVE,
      }}
    >
        
      {/* Home (rightmost) */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Camera placeholder (middle) */}
      <Tabs.Screen
        name="camera"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" size={size + 8} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Profile (leftmost) */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
