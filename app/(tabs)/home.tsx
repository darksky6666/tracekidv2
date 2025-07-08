import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Vibration,
} from "react-native";
import { Card } from "~/components/ui/card";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ProgressCircle } from "~/components/ProgressCircle";

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-gray-100 p-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Profile Card */}
      <Card className="flex-row items-center justify-between p-5 mb-5 bg-white rounded-2xl shadow-lg">
        <View className="flex-row items-center">
          <View className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-gray-200">
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View>
            <View className="flex-row items-center mb-1">
              <Text className="text-xl font-extrabold">Adren</Text>
              <View className="w-2 h-2 rounded-full bg-green-500 ml-2" />
            </View>
            <Text className="text-gray-500">Last updated: 5:30 PM</Text>
          </View>
        </View>
        <Pressable className="px-2 py-1 rounded-lg bg-gray-100 active:bg-gray-200">
          <Text className="text-gray-500 font-medium">▼ Change</Text>
        </Pressable>
      </Card>

      {/* Location & Safety Score */}
      <View className="flex-row mb-5">
        <Card className="flex-1 flex-col bg-white rounded-2xl shadow-lg p-4">
          <Text className="flex-1 text-gray-400">Location</Text>
          <View className="flex-grow-[2] flex-shrink justify-center items-center">
            <Text className="text-lg font-semibold text-gray-900">
              Playground Area
            </Text>
          </View>
        </Card>
        <Card className="flex-1 flex-col bg-white rounded-2xl shadow-lg p-4">
          <Text className="flex-1 text-gray-400">Safety Score</Text>
          <View className="flex-grow-[2] flex-shrink justify-center items-center pt-2">
            <ProgressCircle
              percent={90}
              size={56}
              strokeWidth={4}
              color="#22c55e"
            >
              <Text className="text-lg font-bold text-green-600">90%</Text>
            </ProgressCircle>
          </View>
        </Card>
      </View>

      {/* AI Insights */}

      <Pressable
        className="rounded-2xl"
        onPress={() => {
          Vibration.vibrate(300);
        }}
      >
        <Card className="p-5 bg-white rounded-2xl shadow-lg flex-col gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-gray-900 text-xl">
              AI Insights
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#a3a3a3" />
          </View>

          <View className="flex-row gap-3 items-center mt-2">
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#fbbf24"
            />
            <View className="flex-1 flex-col gap-1">
              <Text className="text-gray-700 font-semibold">
                Safe Location Pattern
              </Text>
              <Text className="text-gray-700 text-sm">
                Playground Area for the past 3 hours, following their usual
                schedule.
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3 items-center mt-2">
            <MaterialIcons name="graphic-eq" size={24} color="#fbbf24" />
            <View className="flex-1 flex-col gap-1">
              <Text className="text-gray-700 font-semibold">
                Recent Voice Analysis
              </Text>
              <Text className="text-gray-700 text-sm">
                All voices detected in the past hour match trusted profiles.
              </Text>
            </View>
          </View>
        </Card>
      </Pressable>

      {/* Recent Activity */}

      <View className="flex-col gap-2 mt-5">
        <View className="flex-row items-center gap-4 p-2">
          <Text className="font-semibold text-gray-900 text-lg">
            Recent Activity
          </Text>
          <Pressable
            onPress={() => {
              Vibration.vibrate(300);
            }}
          >
            <View className="bg-gray-200 rounded-full p-2">
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </Pressable>
        </View>

        {/* Activity Feed */}
        <Card className="p-5 bg-white rounded-2xl shadow-lg flex-col gap-5">
          <View className="flex-col gap-1">
            <Text className="font-semibold">Arrived at Playground Area</Text>
            <Text className="text-xs text-gray-500">
              123 Jalan Tampoi, Tampoi, Johor Bahru, Malaysia
            </Text>
            <Text className="text-xs text-gray-400">4:30 PM Today</Text>
          </View>

          <View className="flex-col gap-1">
            <Text className="font-semibold">New voice detected</Text>

            <Text className="text-xs text-gray-500">
              Good morning class. I am Ms. Wong, your new assistant teacher.
            </Text>

            <View className="flex-row items-center gap-2 my-2">
              <Pressable className="flex-row items-center px-2 py-1 rounded-lg bg-[#fff7ed] active:bg-[#ffe4c7]">
                <Ionicons
                  name="play-circle-outline"
                  size={18}
                  color="#fbbf24"
                />
                <Text className="ml-1 text-xs text-gray-700 font-medium">
                  Play audio
                </Text>
              </Pressable>
              <Pressable className="flex-row items-center px-2 py-1 rounded-lg bg-blue-50 active:bg-blue-100">
                <Ionicons name="add-outline" size={16} color="#2563eb" />
                <Text className="ml-1 text-xs text-blue-600 font-medium">
                  Add to trusted
                </Text>
              </Pressable>
            </View>

            <Text className="text-xs text-gray-400">1:30 PM Today</Text>
          </View>

          <View className="flex-col gap-1">
            <Text className="font-semibold text-gray-900">
              Arrived at Kindergarden
            </Text>
            <Text className="text-xs text-gray-500">
              Arrived at Nuri Kindergarden, Tampoi, Johor Bahru
            </Text>
            <Text className="text-xs text-gray-400">11:40 AM Today</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
