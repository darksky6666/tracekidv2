import { Tabs, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Linking, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Tabs
      initialRouteName="home"
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarButton: (props) => {
          const filteredProps = Object.fromEntries(
            Object.entries(props).filter(([_, v]) => v !== null)
          );
          return <TouchableOpacity {...filteredProps} activeOpacity={1} />;
        },
        tabBarItemStyle: {
          alignItems: "center",
          flexDirection: "row",
        },
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarStyle: {
          height: 55 + insets.bottom,
        },
        tabBarHideOnKeyboard: true,
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#0c4e80",
        },
        tabBarIcon: ({ color, size, focused }) => {
          switch (route.name) {
            case "home":
              return <Ionicons name="home" size={size} color={color} />;
            case "map":
              return (
                <Ionicons name="location-outline" size={size} color={color} />
              );
            case "chat":
              return (
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={size}
                  color={color}
                />
              );
            case "feed":
              return (
                <MaterialCommunityIcons
                  name="clipboard-list-outline"
                  size={size}
                  color={color}
                />
              );
            case "profile":
              return <AntDesign name="user" size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Trace Kid",
          // headerRight: () => {
          //   return (
          //     <TouchableOpacity
          //       onPress={() => router.push("/setting")}
          //       style={{ marginRight: 16 }}
          //       hitSlop={8}
          //     >
          //       <Ionicons name="settings-outline" size={24} color="black" />
          //     </TouchableOpacity>
          //   );
          // },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "AI Assistant",
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Live Location Tracking",
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => Linking.openURL("tel:999")}
                style={{ marginRight: 16 }}
                hitSlop={8}
              >
                <AntDesign name="exclamationcircle" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Activity Feed",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile & Settings",
        }}
      />
    </Tabs>
  );
}
