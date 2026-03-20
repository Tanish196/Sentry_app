import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

const COLORS = {
  primary: "#FF385C",
  background: "#0B1326",
  surfaceContainerHigh: "#222A3D",
  surfaceBright: "#31394D",
  text: "#DAE2FD",
  textMuted: "#8A9BB8",
  white: "#FFFFFF",
  border: "rgba(92, 63, 65, 0.2)",
  error: "#FF385C",
};

export default function UserTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surfaceContainerHigh,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          elevation: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          height: 72,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          letterSpacing: 0.5,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: `${COLORS.primary}20` },
              ]}
            >
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: `${COLORS.primary}20` },
              ]}
            >
              <MaterialCommunityIcons
                name={focused ? "compass" : "compass-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="emergency"
        options={{
          title: "SOS",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.sosButton,
                focused && { backgroundColor: "#CC0033", transform: [{ scale: 1.05 }] },
              ]}
            >
              <MaterialCommunityIcons
                name="shield-alert"
                size={26}
                color={COLORS.white}
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "800",
            color: COLORS.primary,
            letterSpacing: 0.5,
          },
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: `${COLORS.primary}20` },
              ]}
            >
              <MaterialCommunityIcons
                name={focused ? "map" : "map-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: `${COLORS.primary}20` },
              ]}
            >
              <MaterialCommunityIcons
                name={focused ? "account-circle" : "account-circle-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  sosButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FF385C",
    marginTop: -22,
    borderWidth: 3,
    borderColor: "#222A3D",
    shadowColor: "#FF385C",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 16,
  },
});
