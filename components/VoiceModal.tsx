import React, { useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import Toast from "react-native-toast-message";
import * as Animatable from "react-native-animatable";
import * as Speech from "expo-speech";
import type { ViewStyle, TextStyle, ImageStyle } from "react-native";

type VoiceModalProps = {
  visible: boolean;
  onClose: () => void;
  onResult: (text: string) => void;
};

const pulseAnim = {
  0: { scale: 1 },
  0.5: { scale: 1.5 },
  1: { scale: 1 },
};

export function VoiceModal({ visible, onClose, onResult }: VoiceModalProps) {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Start on mount if visible
  useEffect(() => {
    if (visible) {
      Speech.stop();
      startListening();
    } else {
      stopListening();
      setTranscript("");
    }

    return () => {
      stopListening();
    };
  }, [visible]);

  const startListening = async () => {
    const { granted } =
      await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!granted) {
      Toast.show({
        type: "error",
        text1: "Mic Permission",
        text2:
          "Permission required. Click to fix.",
        position: "bottom",
        onPress() {
          Linking.openSettings();
        },
      });
      onClose();
      return;
    }

    setTranscript("");
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
    });
  };

  const stopListening = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  useSpeechRecognitionEvent("start", () => {
    setIsListening(true);
  });

  useSpeechRecognitionEvent("result", (event) => {
    const text = event.results?.[0]?.transcript || "";
    console.log("[Speech] Transcript:", text);
    setTranscript(text);
  });

  useSpeechRecognitionEvent("end", () => {
    console.log("[Speech] Ended");
    setIsListening(false);
    onClose();
    if (transcript.trim()) onResult(transcript.trim());
  });

  useSpeechRecognitionEvent("error", (e) => {
    console.warn("[Speech] Error:", e.error, e.message);
    setIsListening(false);
    onClose();
  });

  const strongPulse: Animatable.CustomAnimation<
    ViewStyle & TextStyle & ImageStyle
  > = {
    0: { transform: [{ scale: 1 }], opacity: 0.6 },
    0.5: { transform: [{ scale: 2.5 }], opacity: 0.2 },
    1: { transform: [{ scale: 1 }], opacity: 0 },
  };

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.3}
      onBackdropPress={stopListening}
    >
      <View className="bg-white p-8 rounded-2xl items-center overflow-hidden">
        <View className="relative justify-center items-center">
          {isListening &&
            [0, 300, 600].map((delay, i) => (
              <Animatable.View
                key={i}
                animation={strongPulse}
                easing="ease-out"
                iterationCount="infinite"
                duration={2000}
                delay={delay}
                style={{
                  position: "absolute",
                  width: 125,
                  height: 125,
                  borderRadius: 75,
                  backgroundColor: "rgba(251,191,36,0.3)",
                }}
              />
            ))}
          <TouchableOpacity
            onPress={stopListening}
            className="bg-yellow-300 p-6 rounded-full"
          >
            <Ionicons name={"mic"} size={48} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text className="mt-6 text-center text-lg text-word font-bold">
          {isListening ? "Listening..." : transcript || "Start speaking"}
        </Text>
      </View>
    </Modal>
  );
}
