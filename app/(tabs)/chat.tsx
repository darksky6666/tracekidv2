import React, { useRef, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Pressable,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useChatStore, Message } from "~/store/chatStore";
import { VoiceModal } from "~/components/VoiceModal";
import { fetchChatResponse } from "~/services/openai";
import uuid from "react-native-uuid";
import { TypingAnimation } from "react-native-typing-animation";
import * as Speech from "expo-speech";
import Toast from "react-native-toast-message";

const urlRegex = /(https?:\/\/[^\s]+)/g;

export default function ChatScreen() {
  const { messages, addMessage, updateMessage } = useChatStore();
  const [input, setInput] = useState("");
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);

  const handleSendText = () => {
    if (!input.trim()) return;
    Speech.stop();
    console.log("handleSendText called");

    const userMessage = input.trim();
    addMessage(userMessage, "user", false);
    setInput("");

    const loadingId = uuid.v4().toString();
    console.log("Adding bot loading message with id:", loadingId);
    addMessage("", "bot", false, loadingId, true);

    fetchChatResponse(userMessage, (fullResponse) => {
      console.log("fetchChatResponse callback", fullResponse);
      updateMessage(loadingId, {
        text: fullResponse || "Something went wrong. Please try again.",
        isLoading: false,
      });
    });
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      className={`max-w-[70%] mb-4 rounded-2xl px-4 py-3 ${
        item.from === "user"
          ? "self-end bg-bg"
          : "self-start bg-word2"
      }`}
    >
      {item.isLoading ? (
        <View className="p-3">
          <TypingAnimation
            dotColor="black"
            dotAmplitude={2}
            dotSpeed={0.1}
            dotRadius={2.5}
            dotX={-3}
            dotY={0}
          />
        </View>
      ) : (
        <>
          {item.text.match(urlRegex) ? (
            <Pressable
              onPress={() => {
                const urls = [...item.text.matchAll(urlRegex)].map((m) => m[0]);
                if (urls.length > 0) {
                  const url = urls[0];
                  Linking.openURL(url).catch(
                    (err) =>
                      Toast.show({
                        type: "error",
                        text1: "Link error",
                        text2: err,
                        position: "bottom",
                      })
                    // console.warn("Failed to open URL:", url, err)
                  );
                }
              }}
            >
              <Text className="text-black font-medium">{item.text}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons
                  name="information-circle-outline"
                  color="#0c4e80"
                  className="text-xs mr-1"
                />
                <Text className="text-black text-xs">
                  Link detected. Click to Navigate.
                </Text>
              </View>
            </Pressable>
          ) : (
            <Text className="text-black font-medium">{item.text}</Text>
          )}
          <Text className="text-xs text-gray-500 mt-1 text-right">
            {item.timestamp}
          </Text>
        </>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <VoiceModal
        visible={voiceModalVisible}
        onClose={() => setVoiceModalVisible(false)}
        onResult={(text) => {
          addMessage(text, "user", true);
          setVoiceModalVisible(false);

          const loadingId = uuid.v4().toString();
          addMessage("", "bot", false, loadingId, true);

          fetchChatResponse(text, (fullResponse) => {
            updateMessage(loadingId, {
              text: fullResponse || "Something went wrong. Please try again.",
              isLoading: false,
            });
          });
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={{ flex: 1, backgroundColor: "#fff" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            ref={flatListRef}
            className="flex-1 p-4"
            onContentSizeChange={() =>
              setTimeout(
                () => flatListRef.current?.scrollToEnd({ animated: true }),
                50
              )
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            ListFooterComponent={<View style={{ height: 20 }} />}
            renderItem={renderItem}
          />
        </TouchableWithoutFeedback>

        <View className="flex-row items-center px-2 py-2 mx-4 mb-2 border border-word rounded-2xl">
          <TextInput
            placeholder="Message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSendText}
            className="flex-1 bg-white px-4 py-2 font-medium"
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={() => setVoiceModalVisible(true)}
            className="ml-2"
          >
            <Ionicons name="mic-outline" size={24} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendText} className="ml-5 mr-3">
            <Ionicons name="send" size={24} color="#444" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
