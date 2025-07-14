import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const ACTIVITY_DATA = [
  {
    title: "Arrived at Nuri Kindergarten, Tampoi, Johor Bahru",
    time: "11:40 AM",
  },
  {
    title: "Arrived at Jalan Tampoi, Johor Bahru",
    time: "11:35 AM",
  },
  {
    title: "Arrived at Skudai Highway, Johor Bahru",
    time: "11:30 AM",
  },
  {
    title: "Arrived at Near Plaza Larkin, Johor Bahru",
    time: "11:25 AM",
  },
  {
    title: "Arrived at Larkin, Johor Bahru",
    time: "11:20 AM",
  },
];

export default function ActivityTab() {
  const renderActivity = ({ item }: { item: (typeof ACTIVITY_DATA)[0] }) => (
    <View className="flex-col gap-1 bg-white px-4 py-4 border-b border-gray-200">
      <Text className="text-black font-semibold">{item.title}</Text>
      <Text className="text-sm text-gray-600 mb-2">{item.time}</Text>
      <TouchableOpacity>
        <View className="flex-row justify-between bg-gray-300 px-3 py-2 rounded-lg">
          <Text className="text-sm text-gray-800">Normal movement pattern</Text>
          <Text className="text-sm text-gray-800 font-semibold">Details</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 flex-col">
      <Text className="text-left text-word px-4 mb-3 text-lg font-bold">
        Mon Jun 19 2025
      </Text>
      <FlatList
        data={ACTIVITY_DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderActivity}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
