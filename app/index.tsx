import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button } from "~/components/ui/button";
import Animated, { FadeInUp } from "react-native-reanimated";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();

  // Responsive paddings and image size
  const containerPadding = width < 400 ? 16 : 24;
  const imageSize = width < 400 ? 72 : 96;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: containerPadding,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          entering={FadeInUp.duration(500)}
          style={{ alignItems: "center", marginBottom: 40 }}
        >
          <Image
            source={require("../assets/images/icon.png")}
            style={{
              width: imageSize,
              height: imageSize,
              marginBottom: 16,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              fontSize: width < 400 ? 24 : 30,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Trace Kid
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(200).duration(500)}>
          <Text
            style={{
              fontSize: width < 400 ? 16 : 18,
              fontWeight: "600",
              textAlign: "center",
              color: "#000",
              marginBottom: 8,
            }}
          >
            Create an account
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#6B7280",
              marginBottom: 24,
              fontSize: width < 400 ? 13 : 15,
            }}
          >
            Enter your email to sign up for this app
          </Text>

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#D1D5DB",
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginBottom: 16,
              color: "#000",
              fontSize: width < 400 ? 14 : 16,
            }}
            placeholder="email@domain.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
          />

          <Button
            style={{
              backgroundColor: "#000",
              paddingVertical: 12,
              borderRadius: 16,
            }}
            onPress={() => {
              router.navigate("/testroute");
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "500",
                fontSize: width < 400 ? 14 : 16,
              }}
            >
              Continue
            </Text>
          </Button>
        </Animated.View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 24,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#D1D5DB" }} />
          <Text style={{ marginHorizontal: 16, color: "#6B7280" }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#D1D5DB" }} />
        </View>

        <Animated.View entering={FadeInUp.delay(400).duration(500)}>
          <Button
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3F4F6",
              paddingVertical: 12,
              borderRadius: 16,
              marginBottom: 12,
            }}
            variant="outline"
          >
            <AntDesign
              name="google"
              size={20}
              color="black"
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontWeight: "500",
                color: "#000",
                fontSize: width < 400 ? 14 : 16,
              }}
            >
              Continue with Google
            </Text>
          </Button>

          <Button
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3F4F6",
              paddingVertical: 12,
              borderRadius: 16,
            }}
            variant="outline"
          >
            <FontAwesome
              name="apple"
              size={20}
              color="black"
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontWeight: "500",
                color: "#000",
                fontSize: width < 400 ? 14 : 16,
              }}
            >
              Continue with Apple
            </Text>
          </Button>
        </Animated.View>
        <Text
          style={{
            textAlign: "center",
            fontSize: width < 400 ? 10 : 12,
            color: "#6B7280",
            marginTop: 24,
          }}
        >
          By clicking continue, you agree to our{" "}
          <Text style={{ textDecorationLine: "underline" }}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={{ textDecorationLine: "underline" }}>
            Privacy Policy
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
