import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Card } from "./ui/card";

export default function VoiceTab() {
  const [click, setClick] = useState(false);
  return (
    <ScrollView className="flex-1">
      <Card className="flex-col gap-3 bg-white rounded-2xl shadow-lg p-4">
        <View className="flex-row items-start gap-3">
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="volume-high"
              size={20}
              color="#fff"
              className="mt-1 p-2 bg-word rounded-full"
            />
          </TouchableOpacity>
          <View className="flex-1 flex-col gap-1">
            <Text className="font-bold text-black">New voice detected</Text>
            <Text className="text-black">
              Good morning class. I am Ms. Wong, your new assistant teacher.
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="px-5" />
          <TouchableOpacity className="flex-row gap-1">
            <Ionicons name="play-circle-outline" size={18} color="#0c4e80" />
            <Text className="text-sm text-black font-bold">Play audio</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row gap-1">
            <AntDesign name="plus" size={18} color="#0c4e80" />
            <Text className="text-sm text-black font-bold">Add to trusted</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-3 items-center">
          <View className="px-5" />
          <Text className="text-xs text-black">1:30 PM Today</Text>
        </View>

        <TouchableOpacity>
          <View className="flex-row items-center bg-gray-300 px-3 py-2 rounded-lg">
            <Text className="flex-1 text-sm text-black">
              AI Assessment: Unrecognized but non-threatening voice
            </Text>
            <Text className="text-sm text-black font-semibold">Details</Text>
          </View>
        </TouchableOpacity>
      </Card>

      <Pressable
        className="flex-row items-center justify-center mt-4 gap-2"
        onPress={() => setClick(!click)}
      >
        {!click ? (
          <>
            <Text className="text-black font-medium text-sm">
              Load previous activities
            </Text>
            <View className="rounded-full bg-gray-200 p-1">
              <Ionicons name="chevron-down" size={18} color="black" />
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" color="#0c4e80" />
        )}
      </Pressable>
    </ScrollView>
  );
}
