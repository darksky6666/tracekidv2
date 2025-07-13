import "~/global.css";

import { Slot } from "expo-router";
import * as React from "react";
import { PortalHost } from "@rn-primitives/portal";
import { SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";
import { AuthProvider } from "~/providers/AuthProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView className="flex-1">
        <Slot />
        <Toast />
        <PortalHost />
      </SafeAreaView>
    </AuthProvider>
  );
}
