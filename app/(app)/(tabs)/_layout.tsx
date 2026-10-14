import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFBD0B",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#061326",
          borderTopWidth: 0.5,
          borderTopColor: "#ccc",
          height: 54 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {/* ✅ Dashboard first tab */}
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ✅ My Videos second tab */}
      <Tabs.Screen
        name="myvideos/index"
        options={{
          title: "My Training",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "videocam" : "videocam-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ✅ Profile last tab */}
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
