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
      className="flex-1 bg-bg p-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Profile Card */}
      <Card className="flex-row items-center justify-between p-5 mb-5 bg-white rounded-2xl shadow-lg">
        <View className="flex-row items-center">
          <View className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-gray-200">
            <Image
              source={require("~/assets/kid.png")}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View>
            <View className="flex-row items-center mb-1">
              <Text className="text-xl font-extrabold text-word">Adren</Text>
              <View className="w-2 h-2 rounded-full bg-green-500 ml-2" />
            </View>
            <Text className="text-word">Last updated: 5:30 PM</Text>
          </View>
        </View>
        <Pressable className="px-2 py-1 rounded-lg bg-gray-100 active:bg-gray-200">
          <Text className="text-word font-medium">▼ Change</Text>
        </Pressable>
      </Card>

      {/* Location & Safety Score */}
      <View className="flex-row mb-5">
        <Card className="flex-1 flex-col bg-white rounded-2xl shadow-lg p-4">
          <Text className="flex-1 text-word">Location</Text>
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg font-semibold text-word">
              Playground Area
            </Text>
          </View>
        </Card>
        <Card className="flex-1 flex-col bg-white rounded-2xl shadow-lg p-4">
          <Text className="flex-1 text-word mb-2">Safety Score</Text>
          <View className="flex-1 justify-center items-center">
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
            <Text className="font-semibold text-word text-xl">
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
              <Text className="text-word font-semibold">
                Safe Location Pattern
              </Text>
              <Text className="text-word text-sm">
                Playground Area for the past 3 hours, following their usual schedule.
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3 items-center mt-2">
            <MaterialIcons name="graphic-eq" size={24} color="#fbbf24" />
            <View className="flex-1 flex-col gap-1">
              <Text className="text-word font-semibold">
                Recent Voice Analysis
              </Text>
              <Text className="text-word text-sm">
                All voices detected in the past hour match trusted profiles.
              </Text>
            </View>
          </View>
        </Card>
      </Pressable>

      {/* Recent Activity */}

      <View className="flex-col gap-2 mt-3">
        <View className="flex-row items-center gap-4 py-2 pl-4">
          <Text className="font-semibold text-word text-lg">
            Recent Activity
          </Text>
          <Pressable
            onPress={() => {
              Vibration.vibrate(300);
            }}
          >
            <View className="bg-gray-200 rounded-full p-2">
              <Ionicons name="chevron-forward" size={18} color="black" />
            </View>
          </Pressable>
        </View>

        {/* Activity Feed */}
        <Card className="p-5 bg-white rounded-2xl shadow-lg flex-col gap-5">
          <View className="flex-col gap-1">
            <Text className="font-semibold text-word">Arrived at Playground Area</Text>
            <Text className="text-xs text-word">
              123 Jalan Tampoi, Tampoi, Johor Bahru, Malaysia
            </Text>
            <Text className="text-xs text-word">4:30 PM Today</Text>
          </View>

          <View className="flex-col gap-1">
            <Text className="font-semibold text-word">New voice detected</Text>

            <Text className="text-xs text-word">
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

            <Text className="text-xs text-word">1:30 PM Today</Text>
          </View>

          <View className="flex-col gap-1">
            <Text className="font-semibold text-word">
              Arrived at Kindergarden
            </Text>
            <Text className="text-xs text-word">
              Arrived at Nuri Kindergarden, Tampoi, Johor Bahru
            </Text>
            <Text className="text-xs text-word">11:40 AM Today</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
