import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export default function ProfileScreen() {
  return (
    <ScrollView
      className="flex-1 flex-col bg-bg p-4"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 gap-3">
        {/* Profile Section */}
        <Card className="bg-white rounded-2xl shadow-lg">
          <Pressable className="flex-1 flex-row items-center gap-5 p-4">
            <Image
              source={require("~/assets/parent.png")}
              className="w-20 h-20 rounded-full"
            />
            <View className="flex-col gap-1">
              <Text className="text-xl font-bold text-word">Sarah Johnson</Text>
              <Text className="text-gray-600">SarahJohnson@gmail.com</Text>
              <Text className="text-gray-600">0195869725</Text>
              <TouchableOpacity className="mt-2 flex-row gap-2 items-center">
                <MaterialIcons name="edit" size={18} color="#0c4e80" />
                <Text className="font-semibold text-word">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Card>

        {/* Children Section */}
        <View className="flex-col gap-3 justify-center mt-3">
          <Text className="text-left font-bold text-lg text-word">
            Children
          </Text>
          <Card className="bg-white rounded-2xl shadow-lg">
            <TouchableOpacity className="flex-1 flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-4">
                <Image
                  source={require("~/assets/kid.png")}
                  className="w-16 h-16 rounded-full"
                />
                <View className="flex-col gap-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-bold text-xl text-word">Adren</Text>
                    <View className="w-2 h-2 rounded-full bg-green-600" />
                  </View>
                  <Text className="text-sm text-word">Age: 4 years</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#000" />
            </TouchableOpacity>
          </Card>

          <TouchableOpacity className="flex-row justify-center items-center py-3 gap-2">
            <FontAwesome6 name="plus" size={20} color="#0c4e80" />
            <Text className="text-lg font-semibold text-word">Add Child</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View className="flex-col justify-center gap-4">
          <Text className="text-lg font-bold text-word">Settings</Text>
          <Card className="flex-col p-2 gap-2 justify-center bg-white rounded-2xl shadow-lg">
            <TouchableOpacity className="p-4 flex-row items-center gap-4">
              <View className="bg-blue-200 rounded-full p-3">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="black"
                />
              </View>
              <View>
                <Text className="font-semibold text-lg text-word">
                  Notification Settings
                </Text>
                <Text className="text-gray-600">
                  Manage alerts and notifications
                </Text>
              </View>
            </TouchableOpacity>

            <Separator />

            <TouchableOpacity className="p-4 flex-row items-center gap-4">
              <View className="bg-red-200 rounded-full p-3">
                <Ionicons name="warning-outline" size={20} color="black" />
              </View>
              <View>
                <Text className="font-semibold text-lg text-word">
                  Alert Settings
                </Text>
                <Text className="text-gray-600">
                  Configure emergency alerts
                </Text>
              </View>
            </TouchableOpacity>

            <Separator />

            <TouchableOpacity className="p-4 flex-row items-center gap-4">
              <View className="bg-green-100 rounded-full p-3">
                <Ionicons name="language-outline" size={20} color="green" />
              </View>
              <View>
                <Text className="font-semibold text-lg text-word">
                  Language
                </Text>
                <Text className="text-gray-600">English (US)</Text>
              </View>
            </TouchableOpacity>

            <Separator />

            <TouchableOpacity className="p-4 flex-row items-center gap-4">
              <View className="bg-purple-200 rounded-full p-3">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="indigo"
                />
              </View>
              <View>
                <Text className="font-semibold text-lg text-word">
                  Privacy Settings
                </Text>
                <Text className="text-gray-600">
                  Manage data and permissions
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
