import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import ActivityTab from "~/components/ActivityTab";
import VoiceTab from "~/components/VoiceTab";
import AlertTab from "~/components/AlertTab";

const TABS = ["Activity", "Voice", "Alert"];

export default function TimelineScreen() {
  const [activeTab, setActiveTab] = useState("Activity");

  return (
    <View className="flex-1 flex-col gap-4 bg-white py-6 px-4 ">
      {/* Tabs */}
      <View className="flex-row gap-4 px-4 mb-4">
        {TABS.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? "bg-black" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-semibold text-lg ${
                activeTab === tab ? "text-white" : "text-black"
              }`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Dynamic content */}
      {activeTab === "Activity" && <ActivityTab />}
      {activeTab === "Voice" && <VoiceTab />}
      {activeTab === "Alert" && <VoiceTab />}
    </View>
  );
}
