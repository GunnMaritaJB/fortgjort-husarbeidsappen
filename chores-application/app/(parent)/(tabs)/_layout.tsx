import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function ParentTabsLayout() {
  return (
      <Tabs
          screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#2e7d32',
          }}
      >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              testID={"profileTab"}
              name="person"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Oppgaver",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              testID={"taskMenuButton"}
              name="checklist"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Belønninger",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              testID={"rewardMenuButton"}
              name="gift"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Varsler",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Innstillinger",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
