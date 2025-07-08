import '~/global.css';

import { Slot } from 'expo-router';
import * as React from 'react';
import { PortalHost } from '@rn-primitives/portal';
import { SafeAreaView } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaView className='flex-1'>
      <Slot />
      <PortalHost />
    </SafeAreaView>
  );
}