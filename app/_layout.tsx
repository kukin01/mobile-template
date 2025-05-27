import { Stack } from "expo-router";
import { ToastProvider } from 'react-native-toast-notifications';
import "./globals.css";

export default function RootLayout() {
  return (
    <ToastProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(tabs)"
        />
        <Stack.Screen
          name="routes"
          options={{ headerShown: false }}
        />
      </Stack>
    </ToastProvider>
  );
}